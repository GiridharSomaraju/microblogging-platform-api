const pool = require("../config/db")

// like tweet model

const getLikeTweet = async(tweetId,user_id) => {
    const query = `
    SELECT 
        * 
    FROM 
        liketable 
    WHERE 
        tweet_id = $1 
    AND 
        user_id = $2`;

    return await pool.query(query, [tweetId, user_id]);
}

const insertLike = async(tweetId,user_id) => {
    const query = `
]   INSERT INTO 
        liketable(tweet_id,user_id)
        VALUES($1,$2)`;
    
    return await pool.query(query, [tweetId, user_id]);
}

// dislike tweet model

const dislikeTweet = async(tweetId,user_id) => {
    const query = `
    DELETE FROM 
        liketable 
    WHERE 
        tweet_id = $1 
    AND 
        user_id = $2;`;
    
    return await pool.query(query, [tweetId, user_id]);
}

// likes count model

const likeCount = async(tweetId) => {
    const query = `
    SELECT 
        COUNT(*) AS "likesCount" 
    FROM 
        liketable 
    WHERE 
        tweet_id = $1`;

    return await pool.query(query, [tweetId]);
}

module.exports = {getLikeTweet,insertLike,dislikeTweet,likeCount}