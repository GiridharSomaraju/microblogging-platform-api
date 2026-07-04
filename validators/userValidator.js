const { body } = require("express-validator");

const registerValidation = [
  body("name").notEmpty().withMessage("Name is reuired"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters"),
];

const loginValidation = [
    body("email").notEmpty().withMessage("Email is required"),
    body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters"),
]

module.exports = { registerValidation,loginValidation };
