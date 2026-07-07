const express = require("express");

const router = express.Router();

// authentication middleware
const authmiddleware = require("../middleware/authMiddleware");

// controller
const {
  replyTweet,
  getReplies,
  deleteReply,
} = require("../controllers/replyController");

// validation
const {
  deleteReplyValidation,
  getRepliesValidation,
  replyTweetValidation,
} = require("../validators/replyValidator");

// validation middleware
const { validate } = require("../middleware/validate");

/**
 * @swagger
 * /tweets/{tweetId}/replies:
 *   post:
 *     summary: Reply to a tweet
 *     tags:
 *       - Replies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 10
 *         description: Tweet ID to reply to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Reply added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication token is missing or invalid
 *       404:
 *         description: Tweet not found
 */

/**
 * @swagger
 * /tweets/{tweetId}/replies:
 *   get:
 *     summary: Get all replies for a tweet
 *     tags:
 *       - Replies
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
 *         description: Replies retrieved successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Tweet not found
 */

router
  .route("/tweets/:tweetId/replies")
  .post(authmiddleware, replyTweetValidation, validate, replyTweet)
  .get(getRepliesValidation, validate, getReplies);

/**
 * @swagger
 * /replies/{replyId}:
 *   delete:
 *     summary: Delete a reply
 *     tags:
 *       - Replies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: replyId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 25
 *         description: Reply ID
 *     responses:
 *       200:
 *         description: Reply deleted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication token is missing or invalid
 *       404:
 *         description: Reply not found
 */

router.delete(
  "/replies/:replyId",
  authmiddleware,
  deleteReplyValidation,
  validate,
  deleteReply,
);

module.exports = router;
