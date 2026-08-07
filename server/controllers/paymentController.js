const pool = require("../db");

// CREATE PAYMENT

exports.createPayment = async (req, res) => {
  try {
    const userId = req.user.id;

    const { order_id, payment_method } = req.body;

    // Check order belongs to user

    const order = await pool.query(
      `
            SELECT *
            FROM orders
            WHERE id=$1
            AND user_id=$2
            `,

      [order_id, userId],
    );

    if (order.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const result = await pool.query(
      `
            INSERT INTO payments
            (
            order_id,
            payment_method,
            payment_status,
            transaction_id
            )

            VALUES($1,$2,$3,$4)

            RETURNING *

            `,

      [order_id, payment_method, "completed", "TXN-" + Date.now()],
    );

    // update order status

    await pool.query(
      `
            UPDATE orders

            SET status='paid'

            WHERE id=$1

            `,

      [order_id],
    );

    res.status(201).json({
      message: "Payment successful",

      payment: result.rows[0],
    });
  } catch (error) {
    console.error("Payment error:", error);

    res.status(500).json({
      message: "Payment failed",
    });
  }
};
