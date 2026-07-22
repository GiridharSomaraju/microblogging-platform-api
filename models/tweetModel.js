const pool = require("../config/db");

// insert tweet model
const insertUserTweet = async (user_id, tweet) => {
  const query = `
        INSERT INTO tweettable(user_id,tweet)
        VALUES ($1,$2) 
        RETURNING  tweet_id,tweet,posted_at;
    `;
  return await pool.query(query, [user_id, tweet]);
};

// getting user tweet model
const getTweetsByUser = async (user_id, limit, offset, sort) => {
  const order = sort === "latest" ? "DESC" : "ASC";
  const query = `
        SELECT tweet_id,
                tweet,
                posted_at 
        FROM 
            tweettable 
        WHERE 
            user_id = $1 AND isdeleted = FALSE 
        ORDER BY 
            posted_at ${order} 
        OFFSET $2 
        LIMIT $3`;
  return await pool.query(query, [user_id, offset, limit]);
};

const totalTweets = async (user_id) => {
  const query = `
      SELECT 
        COUNT(*):: INTEGER AS total
      FROM 
        tweettable
      WHERE 
        user_id = $1 AND isdeleted = FALSE `;
  return pool.query(query, [user_id]);
};

// delete tweet model
const deleteTweetByUser = async (tweetId, user_id) => {
  const query = `
    UPDATE 
        tweettable 
    SET 
        isdeleted = TRUE 
    WHERE 
    tweet_id = $1 AND 
    user_id = $2 AND 
    isdeleted = FALSE`;
  return await pool.query(query, [tweetId, user_id]);
};

// delete multiple tweets model
const deleteMultipleTweetsByUser = async (tweetId, user_id) => {
  const query = `
    UPDATE 
        tweettable 
    SET 
        isdeleted = TRUE 
    WHERE 
        tweet_id = ANY($1) AND 
        user_id = $2 AND 
        isdeleted = FALSE`;
  return await pool.query(query, [tweetId, user_id]);
};

module.exports = {
  insertUserTweet,
  getTweetsByUser,
  totalTweets,
  deleteTweetByUser,
  deleteMultipleTweetsByUser,
};
