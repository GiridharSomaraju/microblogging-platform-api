const express = require("express");

const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// controller
const {
  getMyProfile,
  searchProfile,
  tweetsFeed,
  getProfileById,
} = require("../controllers/profileController");

// validation
const {
  getUserProfileValidation,
  profileSearchValidation,
  feedValidation,
} = require("../validators/profileValidator");

// validation middleware
const { validate } = require("../middleware/validate");

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Search users by name
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: Giridhar
 *         description: Name of the user to search
 *     responses:
 *       200:
 *         description: Matching users retrieved successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication token is missing or invalid
 */

router.get(
  "/users/search",
  authMiddleware,
  profileSearchValidation,
  validate,
  searchProfile,
);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Authentication token is missing or invalid
 */

router.get("/users/me", authMiddleware, getMyProfile);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user profile by ID
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *         description: User ID of the profile to retrieve
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Authentication token is missing or invalid
 *       404:
 *         description: No user found with the specified ID
 */

router.get(
  "/users/:userId",
  authMiddleware,
  getUserProfileValidation,
  validate,
  getProfileById,
);

/**
 * @swagger
 * /feed:
 *   get:
 *     summary: Get personalized tweet feed
 *     tags:
 *       - Feed
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Feed retrieved successfully
 *       401:
 *         description: Authentication token is missing or invalid
 */
router.get("/feed", authMiddleware, feedValidation, validate, tweetsFeed);

module.exports = router;
