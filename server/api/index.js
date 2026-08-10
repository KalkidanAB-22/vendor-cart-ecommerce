require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("../db");

const authRoutes = require("../routes/authRoutes.js");
const categoryRoutes = require("../routes/categoryRoutes");
const productRoutes = require("../routes/productRoutes");
const cartRoutes = require("../routes/cartRoutes");
const orderRoutes = require("../routes/orderRoutes");
const paymentRoutes = require("../routes/paymentRoutes");
const inventoryRoutes = require("../routes/inventoryRoutes");
const adminOrderRoutes = require("../routes/adminOrderRoutes");
const salesRoutes = require("../routes/salesRoutes");

const errorHandler = require("../middleware/errorMiddleware");

const app = express();

// --------------------
// Middleware
// --------------------

app.use(
  cors({
    origin: ["http://localhost:5173", "https://vendor-cart-app.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// --------------------
// Routes
// --------------------

app.use("/auth", authRoutes);

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);

app.use("/inventory", inventoryRoutes);

app.use("/admin/orders", adminOrderRoutes);

app.use("/sales", salesRoutes);

// --------------------
// Health Check
// --------------------

app.get("/", (req, res) => {
  res.json({
    message: "Vendor Cart API is running 🚀",
    status: "healthy",
  });
});

// --------------------
// Database Test
// --------------------

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      database: "connected",
      time: result.rows[0],
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      database: "failed",
      error: error.message,
    });
  }
});

// --------------------
// 404 Handler
// --------------------

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// --------------------
// Error Handler
// --------------------

app.use(errorHandler);

// --------------------
// Export for Vercel
// --------------------

module.exports = app;
