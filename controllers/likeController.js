
const likeModel = require("../models/likeModel");
//like a tweet API

const likeTweet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { tweetId } = req.params;

    const resultTweet = await likeModel.getLikeTweet(tweetId, user_id);
    if (resultTweet.rowCount != 0) {
      return res.status(400).json({
        message: "you already liked this tweet",
      });
    }

    await likeModel.likeTweet(tweetId, user_id);
    res.status(201).json({
      message: "Liked Tweet Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// unlike a tweet API

const dislikeTweet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { tweetId } = req.params;
    const resultTweet = await likeModel.getLikeTweet(tweetId, user_id);
    if (resultTweet.rowCount === 0) {
      return res.status(400).json({
        message: "you didn't liked this tweet",
      });
    }
    await likeModel.dislikeTweet(tweetId, user_id);
    res.status(200).json({
      message: "Tweet Unliked successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// tweet like count API

const likeCount = async (req, res) => {
  try {
    const { tweetId } = req.params;

    const result = await likeModel.likeCount(tweetId);
    res.status(200).json({
      count: result.rows[0].likesCount,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = { likeTweet, dislikeTweet, likeCount };
