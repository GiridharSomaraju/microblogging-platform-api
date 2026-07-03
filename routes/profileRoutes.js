const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMyProfile,
  getUserProfile,
  searchProfile,
  tweetsFeed,
} = require("../controllers/profileController");
const router = express.Router();

router.get("/users/profile/search", authMiddleware, searchProfile);
router.get("/users/profile", authMiddleware, getMyProfile);
router.get("/users/profile/:userId", getUserProfile);
router.get('/users/tweets',authMiddleware,tweetsFeed)

module.exports = router;
