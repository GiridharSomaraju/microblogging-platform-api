const pool = require("../config/db");

//insert tweet API
const insertTweet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { tweet } = req.body;
    const insertTweetQuery = `INSERT INTO tweettable(user_id,tweet)
        VALUES ($1,$2) 
        RETURNING  tweet_id,tweet,posted_at`;
    const insertOp = await pool.query(insertTweetQuery, [user_id, tweet]);
    res.status(200).json({
      message: "Tweet posted successfully",
      tweet: insertOp.rows[0],
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
    const getTweetQuery = `SELECT * FROM tweettable WHERE user_id = $1 AND isdeleted = FALSE ORDER BY posted_at DESC OFFSET $2 LIMIT $3`;
    const userTweets = await pool.query(getTweetQuery, [
      user_id,
      offset,
      limit,
    ]);
    if (userTweets.rowCount === 0) {
      return res.status(200).json({
        message: "You haven't posted any tweets yet.",
      });
    }
    res.status(200).json({
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
    const deleteQuery = `UPDATE tweettable SET isdeleted = TRUE WHERE tweet_id = $1 AND user_id = $2 AND isdeleted = FALSE`;
    const deleteTweet = await pool.query(deleteQuery, [tweetId, user_id]);
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
    const selectedTweetsQuery = `UPDATE tweettable SET isdeleted = TRUE WHERE tweet_id = ANY($1) AND user_id = $2 AND isdeleted = FALSE`;
    const result = await pool.query(selectedTweetsQuery, [tweetId, user_id]);
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
