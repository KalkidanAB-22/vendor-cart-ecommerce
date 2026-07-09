require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();


// --------------------
// Middleware
// --------------------

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());


// --------------------
// Health Check Route
// --------------------

app.get("/", (req, res) => {
  res.json({
    message: "Shop Lite API is running 🚀",
    status: "healthy"
  });
});


// --------------------
// Database Test Route
// --------------------

app.get("/db-test", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT NOW()"
    );

    res.json({
      database: "connected",
      time: result.rows[0]
    });

  } catch (error) {

    console.error(
      "Database connection error:",
      error
    );

    res.status(500).json({
      database: "failed"
    });

  }

});


// --------------------
// Get Products
// --------------------

app.get("/products", async (req, res) => {

  try {

    const search = req.query.search || "";


    const result = await pool.query(
      `
      SELECT *
      FROM products
      WHERE name ILIKE $1
      ORDER BY id ASC
      `,
      [
        `%${search}%`
      ]
    );


    res.status(200).json(
      result.rows
    );


  } catch (error) {

    console.error(
      "Products fetch error:",
      error
    );


    res.status(500).json({
      message: "Unable to fetch products"
    });

  }

});


// --------------------
// 404 Handler
// --------------------

app.use((req, res) => {

  res.status(404).json({
    message: "Route not found"
  });

});


// --------------------
// Server Start
// --------------------

const PORT = process.env.PORT || 10000;


app.listen(PORT, async () => {

  console.log(
    `Server running on port ${PORT}`
  );


  try {

    await pool.query(
      "SELECT 1"
    );

    console.log(
      "PostgreSQL connected successfully ✅"
    );


  } catch (error) {

    console.error(
      "PostgreSQL connection failed ❌",
      error.message
    );

  }

});