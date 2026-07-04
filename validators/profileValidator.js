const { param, query } = require("express-validator");

const getUserProfileValidation = [
  param("userId").isInt().withMessage("User Id must be an Integer"),
];

const profileSearchValidation = [
  query("name").trim().notEmpty().withMessage("Name Should not empty"),
];

module.exports = { getUserProfileValidation, profileSearchValidation };
