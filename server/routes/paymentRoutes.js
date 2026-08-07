const express = require("express");

const router = express.Router();

const { createPayment } = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware.js");

const { paymentValidation } = require("../validators/paymentValidator");

const validate = require("../middleware/validateMiddleware");

// Create payment

router.post("/", protect, createPayment);
router.post("/", protect, paymentValidation, validate, createPayment);

module.exports = router;
