const express = require("express");

const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// controller
const {
  likeCount,
  likeTweet,
  dislikeTweet,
} = require("../controllers/likeController");

// validator
const { likeTweetValidation } = require("../validators/likeValidation");

// validation middleware
const { validate } = require("../middleware/validate");

/**
 * @swagger
 * /tweets/{tweetId}/like:
 *   post:
 *     summary: Like a tweet
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 10
 *         description: Tweet ID to like
 *     responses:
 *       201:
 *         description: Successfully added a like to the specified tweet
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication token is missing or invalid
 *       404:
 *         description: Tweet not found
 */

/**
 * @swagger
 * /tweets/{tweetId}/like:
 *   delete:
 *     summary: Remove like from a tweet
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 10
 *         description: Tweet ID to remove like from
 *     responses:
 *       200:
 *         description: Successfully removed the like from the specified tweet
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication token is missing or invalid
 *       404:
 *         description: Tweet not found
 */

router
  .route("/tweets/:tweetId/like")
  .post(authMiddleware, likeTweetValidation, validate, likeTweet)
  .delete(authMiddleware, likeTweetValidation, validate, dislikeTweet);

/**
 * @swagger
 * /tweets/{tweetId}/likes:
 *   get:
 *     summary: Get like count of a tweet
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 10
 *         description: Tweet ID
 *     responses:
 *       200:
 *         description: Like count retrieved successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication token is missing or invalid
 *       404:
 *         description: Tweet not found
 */

router.get(
  "/tweets/:tweetId/likes",
  authMiddleware,
  likeTweetValidation,
  validate,
  likeCount,
);

module.exports = router;
