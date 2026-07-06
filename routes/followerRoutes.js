const express = require("express");

const router = express.Router();

// middleware
const authMiddleware = require("../middleware/authMiddleware");

// controller
const {
  followUser,
  unfollowUser,
  getFollowedUsers,
  getFollowingUsers,
} = require("../controllers/followerController");

// validation
const { followUserValidation } = require("../validators/followerValidation");

// validation middleware
const { validate } = require("../middleware/validate");

router
  .route("/users/:userId/follow")
  .post(authMiddleware, followUserValidation, validate, followUser)
  .delete(authMiddleware, followUserValidation, validate, unfollowUser);

router.get("/users/me/following", authMiddleware, getFollowingUsers);
router.get("/users/me/followers", authMiddleware, getFollowedUsers);

module.exports = router;
