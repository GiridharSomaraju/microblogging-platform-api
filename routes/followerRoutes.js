const express = require("express");

const router = express.Router();

// middleware
const authMiddleware = require("../middleware/authMiddleware");

// controller
const {
  followUser,
  unfollowUser,
  getFollowedUsers,
  getFollowingUsers,
} = require("../controllers/followerController");

// validation
const {
  followUserValidation,
  followValidation,
} = require("../validators/followerValidation");

// validation middleware
const { validate } = require("../middleware/validate");

/**
 * @swagger
 * /users/{userId}/follow:
 *   post:
 *     summary: Follow a user
 *     tags:
 *       - Followers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *         description: User ID to follow
 *     responses:
 *       201:
 *         description: Successfully started following the specified user
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication token is missing or invalid
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{userId}/follow:
 *   delete:
 *     summary: Unfollow a user
 *     tags:
 *       - Followers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *         description: User ID to unfollow
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication token is missing or invalid
 *       404:
 *         description: User not found
 */

router
  .route("/users/:userId/follow")
  .post(authMiddleware, followUserValidation, validate, followUser)
  .delete(authMiddleware, followUserValidation, validate, unfollowUser);

/**
 * @swagger
 * /users/me/following:
 *   get:
 *     summary: Get users followed by the logged-in user
 *     tags:
 *       - Followers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Following users retrieved successfully
 *       401:
 *         description: Authentication token is missing or invalid
 */

/**
 * @swagger
 * /users/me/followers:
 *   get:
 *     summary: Get followers of the logged-in user
 *     tags:
 *       - Followers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users who follow the authenticated user
 *       401:
 *         description: Authentication token is missing or invalid
 */

router.get(
  "/users/me/following",
  authMiddleware,
  followValidation,
  validate,
  getFollowingUsers,
);
router.get(
  "/users/me/followers",
  authMiddleware,
  followValidation,
  validate,
  getFollowedUsers,
);

module.exports = router;
