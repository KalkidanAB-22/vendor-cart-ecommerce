const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  deleteOrder,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware.js");

const { orderValidation } = require("../validators/orderValidator");

const validate = require("../middleware/validateMiddleware");

// Checkout / Create order
router.post("/checkout", protect, orderValidation, validate, createOrder);

// Customer order history
router.get("/", protect, getOrders);

// Delete order
router.delete("/:id", protect, deleteOrder);

module.exports = router;
