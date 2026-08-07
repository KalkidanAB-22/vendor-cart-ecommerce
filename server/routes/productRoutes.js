const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleFeatured,
  toggleStatus,
} = require("../controllers/productController");

const validate = require("../middleware/validateMiddleware");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  productValidation,
  productUpdateValidation,
} = require("../validators/productValidator");

const upload = require("../middleware/upload");

// Public

router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  productValidation,
  validate,
  createProduct,
);

router.put(
  "/:id",
  protect,
  adminOnly,
  productUpdateValidation,
  validate,
  updateProduct,
);

router.delete("/:id", protect, adminOnly, deleteProduct);

router.patch("/:id/feature", protect, adminOnly, toggleFeatured);

router.patch("/:id/status", protect, adminOnly, toggleStatus);

module.exports = router;
