const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res) => {
  try {
    const { items, payment_method } = req.body;

    // Validate payment method

    if (!payment_method) {
      return res.status(400).json({
        message: "Payment method is required",
      });
    }

    // Level 1:
    // Only Stripe is available

    if (payment_method !== "stripe") {
      return res.status(400).json({
        message: "This payment method is not available yet",
      });
    }

    // Validate cart

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: items.map((item) => ({
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

      success_url: "https://vendor-cart-app.vercel.app/payment-success",

      cancel_url: "https://vendor-cart-app.vercel.app/payment-cancel",
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
