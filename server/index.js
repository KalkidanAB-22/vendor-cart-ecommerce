require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const authRoutes = require("./routes/authRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes");
const { verifyToken, requireAdmin } = require("./middleware/authMiddleware.js");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const salesRoutes = require("./routes/salesRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// --------------------
// Middleware
// --------------------

app.use(
  cors({
    origin: ["http://localhost:5173", "https://shop-lite-drab.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

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
    message: "Shop Lite API is running 🚀",
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
    });
  }
});

// --------------------
// 404
// --------------------

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorHandler);
// --------------------
// Start Server
// --------------------

const PORT = process.env.PORT || 10000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await pool.query("SELECT 1");

    console.log("PostgreSQL connected successfully ✅");
  } catch (error) {
    console.error("PostgreSQL connection failed ❌", error.message);
  }
});
