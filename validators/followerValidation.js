const {param} = require("express-validator")

const followUserValidation = [
  param("userId").isInt().withMessage("User ID must be an integer"),
];

module.exports = {followUserValidation}