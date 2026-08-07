const express = require("express");

const router = express.Router();

const {
  getCategories,

  createCategory,

  deleteCategory,
} = require("../controllers/categoryController");

const { protect, adminOnly } = require("../middleware/authMiddleware.js");

// Public

router.get("/", getCategories);

// Admin

router.post("/", protect, adminOnly, createCategory);

router.delete("/:id", protect, adminOnly, deleteCategory);

module.exports = router;
