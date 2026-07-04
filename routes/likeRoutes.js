const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  likeCount,
  likeTweet,
  unlikeTweet,
} = require("../controllers/likeController");
const { validate } = require("../middleware/validate");
const likeTweetValidation = require("../validators/likeValidation");

router.post(
  "/likes/:tweetId",
  authMiddleware,
  likeTweetValidation,
  validate,
  likeTweet,
);
router.delete(
  "/like/:tweetId",
  authMiddleware,
  likeTweetValidation,
  validate,
  unlikeTweet,
);
(validate,
  router.get(
    "/likes/:tweetId",
    authMiddleware,
    likeTweetValidation,
    validate,
    likeCount,
  ));

module.exports = router;
