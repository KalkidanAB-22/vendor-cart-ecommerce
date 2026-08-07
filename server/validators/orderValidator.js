const { body } = require("express-validator");

exports.orderValidation = [
  body("items")
    .isArray({
      min: 1,
    })
    .withMessage("Order must contain products"),

  body("items.*.product_id").isInt().withMessage("Invalid product"),

  body("items.*.quantity")
    .isInt({
      min: 1,
    })
    .withMessage("Quantity must be at least 1"),

  body("total_amount")
    .isFloat({
      min: 0,
    })
    .withMessage("Invalid total amount"),
];
