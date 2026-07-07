const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

// controller imports
const {
  getUserTweets,
  deleteUserTweet,
  insertTweet,
  deleteMultipleTweet,
} = require("../controllers/tweetController");

// validation imports
const {
  tweetValidation,
  deleteTweetValidation,
  multiTweetDeleteValidation,
  paginationValidation,
} = require("../validators/tweetValidator");

// validation middleware
const { validate } = require("../middleware/validate");

/**
 * @swagger
 * /users/me/tweets:
 *   post:
 *     summary: Create a new tweet
 *     tags:
 *       - Tweets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Tweet created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication token is missing or invalid
 */

/**
 * @swagger
 * /users/me/tweets:
 *   get:
 *     summary: Get logged-in user's tweets
 *     tags:
 *       - Tweets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tweets per page
 *     responses:
 *       200:
 *         description: Tweets retrieved successfully
 *       400:
 *         description: Invalid pagination parameters
 *       401:
 *         description: Authentication token is missing or invalid
 */

/**
 * @swagger
 * /users/me/tweets:
 *   delete:
 *     summary: Delete multiple tweets
 *     tags:
 *       - Tweets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Tweets deleted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication token is missing or invalid
 */

router
  .route("/users/me/tweets")
  .post(authMiddleware, tweetValidation, validate, insertTweet)
  .get(authMiddleware, paginationValidation, validate, getUserTweets)
  .delete(
    authMiddleware,
    multiTweetDeleteValidation,
    validate,
    deleteMultipleTweet,
  );

/**
 * @swagger
 * /users/me/tweets/{tweetId}:
 *   delete:
 *     summary: Delete a tweet
 *     tags:
 *       - Tweets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 15
 *         description: Tweet ID
 *     responses:
 *       200:
 *         description: Tweet deleted successfully
 *       401:
 *         description: Authentication token is missing or invalid
 *       404:
 *         description: Tweet not found
 */

router.delete(
  "/users/me/tweets/:tweetId",
  authMiddleware,
  deleteTweetValidation,
  validate,
  deleteUserTweet,
);

module.exports = router;
