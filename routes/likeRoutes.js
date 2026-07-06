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

router
  .route("/tweets/:tweetId/like")
  .post(authMiddleware, likeTweetValidation, validate, likeTweet)
  .delete(authMiddleware, likeTweetValidation, validate, dislikeTweet);

router.get(
  "/tweets/:tweetId/likes",
  authMiddleware,
  likeTweetValidation,
  validate,
  likeCount,
);

module.exports = router;
