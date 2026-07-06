const express = require("express");

const router = express.Router();

const { userLogin, userRegister } = require("../controllers/userController");

const {
  registerValidation,
  loginValidation,
} = require("../validators/userValidator");

const { validate } = require("../middleware/validate");

// user registration route
router.post("/auth/register", registerValidation, validate, userRegister);
route;
// user login
router.post("/auth/login", loginValidation, validate, userLogin);

module.exports = router;
