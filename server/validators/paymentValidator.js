const { body } = require("express-validator");

exports.paymentValidation = [
  body("order_id").notEmpty().isInt().withMessage("Invalid order"),

  body("amount")
    .isFloat({
      min: 0,
    })
    .withMessage("Invalid amount"),

  body("payment_method")
    .isIn(["card", "paypal", "cash"])
    .withMessage("Invalid payment method"),
];
