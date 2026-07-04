const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validate");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMyProfile,
  getUserProfile,
  searchProfile,
  tweetsFeed,
} = require("../controllers/profileController");
const {
  getUserProfileValidation,
  profileSearchValidation,
} = require("../validators/profileValidator");

router.get(
  "/users/profile/search",
  authMiddleware,
  profileSearchValidation,
  validate,
  searchProfile,
);
router.get("/users/profile", authMiddleware, getMyProfile);
router.get(
  "/users/profile/:userId",
  getUserProfileValidation,
  validate,
  getUserProfile,
);
router.get("/users/tweets", authMiddleware, tweetsFeed);

module.exports = router;
