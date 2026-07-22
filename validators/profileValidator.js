const { param, query } = require("express-validator");

const getUserProfileValidation = [
  param("userId").isInt().withMessage("User Id must be an Integer"),
];

const profileSearchValidation = [
  query("name").trim().notEmpty().withMessage("Name Should not empty"),
];

const feedValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

module.exports = { getUserProfileValidation, profileSearchValidation,feedValidation };
