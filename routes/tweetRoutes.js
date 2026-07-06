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

router.delete(
  "/users/me/tweets/:tweetId",
  authMiddleware,
  deleteTweetValidation,
  validate,
  deleteUserTweet,
);

module.exports = router;
