const express = require("express")
const router  = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { followUser, unfollowUser, getFollowedUsers, getFollowingUsers, getMyProfile, getUserProfile } = require("../controllers/followerController")

router.post("/users/:userId/follow",authMiddleware,followUser)
router.delete('/users/:userId/unfollow',authMiddleware,unfollowUser)
router.get('/users/following',authMiddleware,getFollowingUsers)
router.get("/users/followers", authMiddleware, getFollowedUsers);


module.exports = router