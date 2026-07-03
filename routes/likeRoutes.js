const express = require("express")
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { likeCount, likeTweet, unlikeTweet } = require("../controllers/likeController")

router.post('/likes/:tweetId',authMiddleware,likeTweet)
router.delete('/like/:tweetId',authMiddleware,unlikeTweet)
router.get('/likes/:tweetId',authMiddleware,likeCount)

module.exports = router