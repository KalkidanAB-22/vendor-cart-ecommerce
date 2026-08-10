const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const pool = require("../db");

exports.createPayment = async (req, res) => {
  try {
    const { order_id, payment_method } = req.body;

    // Validate payment method
    if (!payment_method) {
      return res.status(400).json({
        message: "Payment method is required",
      });
    }

    // Only Stripe is available
    if (payment_method !== "stripe") {
      return res.status(400).json({
        message: "This payment method is not available yet",
      });
    }

    // Validate order ID
    if (!order_id) {
      return res.status(400).json({
        message: "Order ID is required",
      });
    }

    // Find the order belonging to the logged-in user
    const result = await pool.query(
      `
      SELECT
        id,
        user_id,
        total_amount,
        status
      FROM orders
      WHERE id = $1
      AND user_id = $2
      `,
      [order_id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const order = result.rows[0];

    // Don't allow payment for an already paid order
    if (order.status === "paid") {
      return res.status(400).json({
        message: "This order has already been paid",
      });
    }

    // Get order items
    const itemsResult = await pool.query(
      `
      SELECT
        order_items.quantity,
        order_items.price,
        products.name
      FROM order_items
      JOIN products
        ON order_items.product_id = products.id
      WHERE order_items.order_id = $1
      `,
      [order_id],
    );

    if (itemsResult.rows.length === 0) {
      return res.status(400).json({
        message: "Order has no items",
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: itemsResult.rows.map((item) => ({
        price_data: {
          currency: "usd",

          product_data: {
            name: item.name,
          },

          unit_amount: Math.round(Number(item.price) * 100),
        },

        quantity: item.quantity,
      })),

      mode: "payment",

      success_url: "http://localhost:5173/payment-success?order_id=" + order.id,

      cancel_url: "http://localhost:5173/checkout/" + order.id,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe payment error:", error);

    res.status(500).json({
      message: "Payment creation failed",
      error: error.message,
    });
  }
};
