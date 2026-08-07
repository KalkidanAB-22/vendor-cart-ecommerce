const pool = require("../db");

// GET ALL ORDERS

exports.getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(`

SELECT

orders.id,

orders.total,

orders.status,

orders.created_at,


users.email


FROM orders


JOIN users

ON orders.user_id = users.id


ORDER BY orders.created_at DESC


`);

    res.json(result.rows);
  } catch (error) {
    console.error("Orders fetch error:", error);

    res.status(500).json({
      message: "Unable to fetch orders",
    });
  }
};

// UPDATE ORDER STATUS

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const result = await pool.query(
      `

UPDATE orders

SET

status=$1

WHERE id=$2

RETURNING *

`,

      [status, id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Status update error:", error);

    res.status(500).json({
      message: "Unable to update order",
    });
  }
};
