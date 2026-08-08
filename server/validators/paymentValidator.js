const { body } = require("express-validator");

exports.paymentValidation = [
  body("payment_method").notEmpty().withMessage("Payment method is required"),

  body("items").isArray({ min: 1 }).withMessage("Items are required"),

  body("items.*.name").notEmpty().withMessage("Product name is required"),

  body("items.*.price")
    .isNumeric()
    .withMessage("Product price must be a number"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be valid"),
];
