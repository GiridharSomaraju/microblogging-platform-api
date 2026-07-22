const { param, query } = require("express-validator");

const followUserValidation = [
  param("userId").isInt().withMessage("User ID must be an integer"),
];

// pagination validation
const followValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

module.exports = { followUserValidation, followValidation };
