const tweetModel = require("../models/tweetModel");

//insert tweet API
const insertTweet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { tweet } = req.body;
    // model
    const createdTweet = await tweetModel.insertUserTweet(user_id, tweet);
    res.status(201).json({
      message: "Tweet posted successfully",
      tweet: createdTweet.rows[0],
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//Get all tweets
const getUserTweets = async (req, res) => {
  try {
    const user_id = req.user_id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const userTweets = await tweetModel.getTweetsByUser(user_id, limit, offset);
    if (userTweets.rowCount === 0) {
      return res.status(200).json({
        message: "You haven't posted any tweets yet.",
      });
    }
    res.status(200).json({
      page,
      limit,
      count: userTweets.rowCount,
      tweets: userTweets.rows,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//Delete a tweet
const deleteUserTweet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { tweetId } = req.params;
    const deleteTweet = await tweetModel.deleteTweetByUser(tweetId, user_id);
    if (deleteTweet.rowCount === 0) {
      return res.status(404).json({
        message: "Tweet not found or already deleted.",
      });
    }
    res.status(200).json({
      message: "Tweet deleted successfully",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//API for selected tweets deletion
const deleteMultipleTweet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { tweetId } = req.body;
    const result = await tweetId.deleteMultipleTweetsByUser(tweetId, user_id);
    res.status(200).json({
      message: "Tweets deleted successfully",
      deletedCount: result.rowCount,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  insertTweet,
  getUserTweets,
  deleteUserTweet,
  deleteMultipleTweet,
};
