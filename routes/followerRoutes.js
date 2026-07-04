const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  followUser,
  unfollowUser,
  getFollowedUsers,
  getFollowingUsers,
  getMyProfile,
  getUserProfile,
} = require("../controllers/followerController");
const followUserValidation = require("../validators/followerValidation");
const { validate } = require("../middleware/validate");

router.post(
  "/users/:userId/follow",
  authMiddleware,
  followUserValidation,
  validate,
  followUser,
);
router.delete(
  "/users/:userId/unfollow",
  authMiddleware,
  followUserValidation,
  validate,
  unfollowUser,
);
router.get("/users/following", authMiddleware, getFollowingUsers);
router.get("/users/followers", authMiddleware, getFollowedUsers);

module.exports = router;
