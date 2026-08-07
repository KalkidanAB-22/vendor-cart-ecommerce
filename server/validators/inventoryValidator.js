const { body } = require("express-validator");

exports.inventoryValidation = [
  body("product_id").notEmpty().isInt().withMessage("Invalid product"),

  body("quantity")
    .notEmpty()
    .isInt({
      min: 0,
    })
    .withMessage("Quantity must be positive"),
];
