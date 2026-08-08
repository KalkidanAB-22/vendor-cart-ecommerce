const express = require("express");

const router = express.Router();

const { createPayment } = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware.js");

const { paymentValidation } = require("../validators/paymentValidator");

const validate = require("../middleware/validateMiddleware");

// Create Stripe payment session

router.post("/create", protect, paymentValidation, validate, createPayment);

module.exports = router;
