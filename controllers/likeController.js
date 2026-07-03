const pool = require("../config/db");

//like a tweet API

const likeTweet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { tweetId } = req.params;
    const likeTweetQuery = `SELECT * FROM liketable WHERE tweet_id = $1 AND user_id = $2`;
    const resultTweet = await pool.query(likeTweetQuery, [tweetId, user_id]);
    if (resultTweet.rowCount != 0) {
      return res.status(400).json({
        message: "you already liked this tweet",
      });
    }
    const insertLikeQuery = `INSERT INTO liketable(tweet_id,user_id)
                            VALUES($1,$2)`;
    await pool.query(insertLikeQuery, [tweetId, user_id]);
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

const unlikeTweet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { tweetId } = req.params;
    const likeTweetQuery = `SELECT * FROM liketable WHERE tweet_id = $1 AND user_id = $2;`;
    const resultTweet = await pool.query(likeTweetQuery, [tweetId, user_id]);
    if (resultTweet.rowCount === 0) {
      return res.status(400).json({
        message: "you didn't liked this tweet",
      });
    }
    const unlikeQuery = `DELETE FROM liketable WHERE tweet_id = $1 AND user_id = $2;`;
    await pool.query(unlikeQuery, [tweetId, user_id]);
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
    const likeCountQuery = `SELECT COUNT(*) AS "likesCount" FROM liketable WHERE tweet_id = $1`;
    const result = await pool.query(likeCountQuery, [tweetId]);
    res.status(200).json({
      count: result.rows[0].likesCount,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = { likeTweet, unlikeTweet, likeCount };
