
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

    await likeModel.insertLike(tweetId, user_id);
    res.status(201).json({
      message: "Successfully added a like to the specified tweet",
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
      message: "Successfully removed the like from the specified tweet",
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
