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
    console.log(user_id)
    const getTweetQuery = `SELECT * FROM tweettable WHERE user_id = $1 ORDER BY posted_at DESC`;
    const userTweets = await pool.query(getTweetQuery, [user_id]);
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
    const deleteQuery = `DELETE  FROM tweettable WHERE tweet_id = $1 AND user_id = $2`;
    const deleteUser = await pool.query(deleteQuery, [tweetId, user_id]);
    if (deleteUser.rowCount === 0) {
      return res.status(404).json({
        message: "No tweet found",
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
    const selectedTweetsQuery = `DELETE FROM tweettable WHERE tweet_id = ANY($1) AND user_id = $2`;
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
