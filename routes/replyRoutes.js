const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authMiddleware");
const {
  replyTweet,
  getReplies,
  deleteReply,
} = require("../controllers/replyController");
const { validate } = require("../middleware/validate");
const {
  deleteReplyValidation,
  getRepliesValidation,
  replyTweetValidation,
} = require("../validators/replyValidator");

router.post(
  "/reply/:tweetId",
  authmiddleware,
  replyTweetValidation,
  validate,
  replyTweet,
);
router.get("/reply/:tweetId", getRepliesValidation, validate, getReplies);
router.delete(
  "/reply/:replyId",
  authmiddleware,
  deleteReplyValidation,
  validate,
  deleteReply,
);

module.exports = router;
