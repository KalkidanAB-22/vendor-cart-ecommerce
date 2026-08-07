const pool = require("../db");

// GET USER CART

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
SELECT

cart_items.id,

cart_items.quantity,

products.id AS product_id,

products.name,

products.price,

products.image_url


FROM cart_items


JOIN products

ON cart_items.product_id = products.id


WHERE cart_items.user_id=$1

`,

      [userId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Cart fetch error:", error);

    res.status(500).json({
      message: "Unable to fetch cart",
    });
  }
};

// ADD TO CART

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { product_id, quantity } = req.body;

    const result = await pool.query(
      `
INSERT INTO cart_items
(
user_id,
product_id,
quantity
)

VALUES($1,$2,$3)

RETURNING *

`,

      [userId, product_id, quantity || 1],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Add cart error:", error);

    res.status(500).json({
      message: "Unable to add item",
    });
  }
};

// REMOVE FROM CART

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { id } = req.params;

    await pool.query(
      `
DELETE FROM cart_items

WHERE id=$1

AND user_id=$2

`,

      [id, userId],
    );

    res.json({
      message: "Removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to remove item",
    });
  }
};
