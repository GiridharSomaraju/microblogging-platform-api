const {
  getUserTweets,
  deleteUserTweet,
  insertTweet,
  deleteMultipleTweet,
} = require("../controllers/tweetController");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const {
  tweetValidation,
  deleteTweetValidation,
  multiTweetDeleteValidation,
  paginationValidation,
} = require("../validators/tweetValidator");
const { validate } = require("../middleware/validate");
const router = express.Router();

router.post(
  "/user/tweets",
  authMiddleware,
  tweetValidation,
  validate,
  insertTweet,
);
router.get(
  "/user/tweets",
  authMiddleware,
  paginationValidation,
  validate,
  getUserTweets,
);
router.delete(
  "/user/tweets/:tweetId",
  authMiddleware,
  deleteTweetValidation,
  validate,
  deleteUserTweet,
);
router.delete(
  "/user/tweets",
  authMiddleware,
  multiTweetDeleteValidation,
  validate,
  deleteMultipleTweet,
);

module.exports = router;
