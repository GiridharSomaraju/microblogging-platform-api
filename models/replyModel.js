const pool = require("../config/db")

// reply tweet model

const replyTweet = async(reply,tweetId,user_id) => {
    const query = `
    INSERT INTO 
        replytable(reply,tweet_id,user_id) 
        VALUES($1,$2,$3);`;
    
    return await pool.query(query, [reply, tweetId, user_id]);
}

// get replies model

const getReplies = async(tweetId) => {
     const query = `
     SELECT 
        r.reply_id,
        u.name,
        r.reply 
    FROM 
        replytable r 
    INNER JOIN 
        usertable u 
    ON 
        r.user_id = u.user_id 
    WHERE 
        tweet_id = $1;`;
    
    return await pool.query(query, [tweetId]);
}

// delete reply model

const deleteReply = async(replyId,user_id) => {
    const query = `
    UPDATE 
        replytable 
    SET 
        isdeleted = TRUE 
    WHERE 
        reply_id = $1 
    AND 
        user_id = $2 
    AND 
        isdeleted = FALSE`;
    
    return await pool.query(query, [replyId, user_id]);
}

module.exports = {replyTweet,getReplies,deleteReply}