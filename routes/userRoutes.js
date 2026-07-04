const { registerUser, userLogin } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
} = require("../validators/userValidator");
const { validate } = require("../middleware/validate");

router.post("/auth/register", registerValidation, validate, registerUser);
router.post("/auth/login", loginValidation, validate, userLogin);

module.exports = router;
