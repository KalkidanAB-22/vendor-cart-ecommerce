const { body } = require("express-validator");

// CREATE PRODUCT

exports.productValidation = [
  body("name").trim().notEmpty().withMessage("Product name is required"),

  body("price")
    .isFloat({
      min: 0,
    })
    .withMessage("Price must be positive"),

  body("category_id").isInt().withMessage("Invalid category"),

  body("stock")
    .optional()
    .isInt({
      min: 0,
    })
    .withMessage("Invalid stock"),
];

// UPDATE PRODUCT

exports.productUpdateValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({
      min: 3,
    })
    .withMessage("Name too short"),

  body("price")
    .optional()
    .isFloat({
      min: 0,
    })
    .withMessage("Invalid price"),

  body("stock")
    .optional()
    .isInt({
      min: 0,
    })
    .withMessage("Stock cannot be negative"),

  body("category_id").optional().isInt().withMessage("Invalid category"),
];
