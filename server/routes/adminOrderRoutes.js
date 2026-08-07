const express = require("express");

const router = express.Router();

const {
  getAllOrders,

  updateOrderStatus,
} = require("../controllers/adminOrderController");

const {
  protect,

  adminOnly,
} = require("../middleware/authMiddleware");

router.get(
  "/",

  protect,

  adminOnly,

  getAllOrders,
);

router.patch(
  "/:id",

  protect,

  adminOnly,

  updateOrderStatus,
);

module.exports = router;
