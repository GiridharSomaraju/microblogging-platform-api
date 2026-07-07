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
 * /auth/register:
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

router.post("/auth/register", registerValidation, validate, userRegister);

/**
 * @swagger
 * /auth/login:
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

router.post("/auth/login", loginValidation, validate, userLogin);

module.exports = router;
