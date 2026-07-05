const replyModel = require("../models/replyModel");

// reply tweet API
const replyTweet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { tweetId } = req.params;
    const { reply } = req.body;

    await replyModel.replyTweet(reply, tweetId, user_id);
    res.status(201).json({
      message: "Reply Inserted Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// get reply API
const getReplies = async (req, res) => {
  try {
    const { tweetId } = req.params;

    const replies = await replyModel.getReplies(tweetId);
    if (replies.rowCount === 0) {
      return res.status(200).json({
        message: "No replies for this tweet",
      });
    }
    res.status(200).json({
      replies: replies.rows,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// delete reply API

const deleteReply = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { replyId } = req.params;

    const result = await replyModel.deleteReply(replyId, user_id);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Reply not found or you are not authorized to delete it.",
      });
    }
    res.status(200).json({
      message: "Reply Deleted Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = { replyTweet, getReplies, deleteReply };
