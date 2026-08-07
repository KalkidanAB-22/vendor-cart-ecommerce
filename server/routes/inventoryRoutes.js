const express = require("express");

const router = express.Router();

const {
  getInventory,
  updateStock,
} = require("../controllers/inventoryController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { inventoryValidation } = require("../validators/inventoryValidator");

const validate = require("../middleware/validateMiddleware");

// Get inventory

router.get("/", protect, adminOnly, getInventory);

// Update stock

router.patch("/:product_id", protect, adminOnly, updateStock);

module.exports = router;
