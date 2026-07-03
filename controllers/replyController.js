const pool = require("../config/db");

// reply tweet API
const replyTweet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { tweetId } = req.params;
    const { reply } = req.body;
    const insertReplyQuery = `INSERT INTO replytable(reply,tweet_id,user_id) VALUES($1,$2,$3);`;
    await pool.query(insertReplyQuery, [reply, tweetId, user_id]);
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
    const resultQuery = `SELECT r.reply_id,u.name,r.reply FROM replytable r INNER JOIN usertable u ON r.user_id = u.user_id WHERE tweet_id = $1;`;
    const replies = await pool.query(resultQuery, [tweetId]);
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
    const deleteQuery = `UPDATE replytable SET isdeleted = TRUE WHERE reply_id = $1 AND user_id = $2 AND isdeleted = FALSE`;
    const result = await pool.query(deleteQuery, [replyId, user_id]);
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
