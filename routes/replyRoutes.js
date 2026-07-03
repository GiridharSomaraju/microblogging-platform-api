const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/authMiddleware")
const { replyTweet, getReplies, deleteReply } = require("../controllers/replyController")

router.post('/reply/:tweetId',authmiddleware,replyTweet)
router.get('/reply/:tweetId',getReplies)
router.delete('/reply/:replyId',authmiddleware,deleteReply)

module.exports = router