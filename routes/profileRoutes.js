const express = require("express");

const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// controller
const {
  getMyProfile,
  searchProfile,
  tweetsFeed,
  getProfileById,
} = require("../controllers/profileController");

// validation
const {
  getUserProfileValidation,
  profileSearchValidation,
} = require("../validators/profileValidator");

// validation middleware
const { validate } = require("../middleware/validate");

router.get(
  "/users/search",
  authMiddleware,
  profileSearchValidation,
  validate,
  searchProfile,
);
router.get("/users/me", authMiddleware, getMyProfile);
router.get(
  "/users/:userId",
  authMiddleware,
  getUserProfileValidation,
  validate,
  getProfileById,
);
router.get("/feed", authMiddleware, tweetsFeed);

module.exports = router;
