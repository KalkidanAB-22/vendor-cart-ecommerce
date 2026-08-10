const { body } = require("express-validator");

exports.paymentValidation = [
  body("payment_method").notEmpty().withMessage("Payment method is required"),

  body("order_id")
    .notEmpty()
    .withMessage("Order ID is required")
    .isInt()
    .withMessage("Order ID must be a number"),
];
