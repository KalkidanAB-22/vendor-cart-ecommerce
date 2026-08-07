const pool = require("../db");

// SALES OVERVIEW

exports.getSalesOverview = async (req, res) => {
  try {
    // Revenue
    const revenueResult = await pool.query(`
      SELECT
      COALESCE(SUM(total_amount),0) AS revenue

      FROM orders

      WHERE status != 'cancelled'
    `);

    // Orders
    const orderResult = await pool.query(`
      SELECT
      COUNT(*) AS total_orders

      FROM orders
    `);

    // Customers
    const customerResult = await pool.query(`
      SELECT
      COUNT(*) AS total_customers

      FROM users
    `);

    // Best Selling Products
    const productResult = await pool.query(`
      SELECT

      products.name,

      SUM(order_items.quantity) AS sold

      FROM order_items

      JOIN products

      ON products.id = order_items.product_id

      GROUP BY products.id, products.name

      ORDER BY sold DESC

      LIMIT 5
    `);

    res.json({
      revenue: revenueResult.rows[0].revenue,
      orders: orderResult.rows[0].total_orders,
      customers: customerResult.rows[0].total_customers,
      bestProducts: productResult.rows,
    });
  } catch (error) {
    console.error("Sales overview error:", error);

    res.status(500).json({
      message: "Unable to fetch sales data",
    });
  }
};
