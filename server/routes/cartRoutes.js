const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware.js");

// Get user's cart

router.get("/", protect, getCart);

// Add item to cart

router.post("/", protect, addToCart);

// Remove item from cart

router.delete("/:id", protect, removeFromCart);

module.exports = router;
