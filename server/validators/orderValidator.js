const { body } = require("express-validator");

exports.orderValidation = [
  body("payment_method").notEmpty().withMessage("Payment method is required"),
];
