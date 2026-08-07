const pool = require("../db");

// CREATE ORDER FROM CART

exports.createOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Get cart items

    const cart = await client.query(
      `
      SELECT 
        cart_items.product_id,
        cart_items.quantity,
        products.price

      FROM cart_items

      JOIN products

      ON cart_items.product_id = products.id

      WHERE cart_items.user_id=$1
      `,
      [req.user.id],
    );

    if (cart.rows.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // 2. Calculate total

    let total = 0;

    cart.rows.forEach((item) => {
      total += Number(item.price) * item.quantity;
    });

    // 3. Create order

    const order = await client.query(
      `
      INSERT INTO orders
      (
        user_id,
        total_amount,
        status
      )

      VALUES($1,$2,$3)

      RETURNING *
      `,

      [req.user.id, total, "pending"],
    );

    const orderId = order.rows[0].id;

    // 4. Create order items

    for (const item of cart.rows) {
      await client.query(
        `
        INSERT INTO order_items
        (
          order_id,
          product_id,
          quantity,
          price
        )

        VALUES($1,$2,$3,$4)

        `,

        [orderId, item.product_id, item.quantity, item.price],
      );
    }

    // 5. Empty cart

    await client.query(
      `
      DELETE FROM cart_items

      WHERE user_id=$1
      `,

      [req.user.id],
    );

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order created successfully",

      order: order.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Order creation error:", error);

    res.status(500).json({
      message: "Order failed",
    });
  } finally {
    client.release();
  }
};

// GET USER ORDERS

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        orders.id,
        orders.status,
        orders.total_amount,
        orders.created_at

      FROM orders

      WHERE orders.user_id = $1

      ORDER BY orders.id DESC
      `,
      [userId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ORDER

exports.deleteOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const orderId = req.params.id;

    await pool.query(
      `
      DELETE FROM order_items
      WHERE order_id = $1
      `,
      [orderId],
    );

    const result = await pool.query(
      `
      DELETE FROM orders

      WHERE id = $1

      AND user_id = $2

      RETURNING *
      `,
      [orderId, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order removed",
    });
  } catch (error) {
    console.error("Delete order error:", error);

    res.status(500).json({
      message: "Unable to delete order",
    });
  }
};
