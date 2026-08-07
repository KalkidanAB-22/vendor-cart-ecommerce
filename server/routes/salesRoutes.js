const express = require("express");

const router = express.Router();

const { getSalesOverview } = require("../controllers/salesController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get(
  "/overview",

  protect,

  adminOnly,

  getSalesOverview,
);

module.exports = router;
