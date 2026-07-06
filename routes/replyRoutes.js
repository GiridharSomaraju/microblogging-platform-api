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

router
  .route("/tweets/:tweetId/replies")
  .post(authmiddleware, replyTweetValidation, validate, replyTweet)
  .get(getRepliesValidation, validate, getReplies);
router.delete(
  "/replies/:replyId",
  authmiddleware,
  deleteReplyValidation,
  validate,
  deleteReply,
);

module.exports = router;
