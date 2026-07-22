const express = require("express");

const router = express.Router();

const { userLogin, userRegister } = require("../controllers/userController");

const {
  registerValidation,
  loginValidation,
} = require("../validators/userValidator");

const { validate } = require("../middleware/validate");

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

router.post(
  "/api/v1/auth/register",
  registerValidation,
  validate,
  userRegister,
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 */

router.post("/api/v1/auth/login", loginValidation, validate, userLogin);

module.exports = router;
