const {
  getUserTweets,
  deleteUserTweet,
  insertTweet,
  deleteMultipleTweet,
} = require("../controllers/tweetController");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.post("/user/tweets", authMiddleware, insertTweet);
router.get("/user/tweets",authMiddleware, getUserTweets);
router.delete("/user/tweets/:tweetId", authMiddleware, deleteUserTweet);
router.delete("/user/tweets", authMiddleware, deleteMultipleTweet);

module.exports = router;
