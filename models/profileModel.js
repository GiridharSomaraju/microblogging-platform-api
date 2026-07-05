const pool = require("../config/db");

// getProfile and getProfileById model

const getUserByEmail = async (user_id) => {
  const query = `
    SELECT 
        u.name,
        u.email,
        u.gender,
        u.created_at,
        (SELECT COUNT(*) FROM followertable WHERE following_user_id = u.user_id) AS followers,
        (SELECT COUNT(*) FROM followertable WHERE follower_user_id = u.user_id) AS following,
        (SELECT COUNT(*) FROM tweettable WHERE user_id = u.user_id) AS tweets
    FROM 
        usertable u 
    where 
        u.user_id = $1;
    `;
  return await pool.query(query, [user_id]);
};

// searchProfile model

const getUserByUsername = async (name, user_id) => {
  const query = `
    SELECT
        u.user_id,
        u.name,
        u.created_at,
        (SELECT COUNT(*) FROM followertable WHERE following_user_id = u.user_id) AS followers,
        (SELECT COUNT(*) FROM followertable WHERE follower_user_id = u.user_id) AS following,
        (SELECT COUNT(*) FROM tweettable WHERE user_id = u.user_id) AS tweets
    FROM 
        usertable u 
    WHERE
        u.name ILIKE $1 
    AND 
        u.user_id <> $2 
    LIMIT 10;
    `;
  return await pool.query(query, [`%${name}%`, user_id]);
};

// tweets feed model

const tweetsFeed = async (user_id) => {
  const query = `
        SELECT
            t.tweet_id,
            t.tweet,
            t.posted_at,
            u.user_id,
            u.name,
            COUNT(l.tweet_id):: INTEGER AS likes
        FROM 
            tweettable t
        INNER JOIN 
            usertable u
        ON 
            t.user_id = u.user_id
        INNER JOIN 
            followertable f
        ON 
            t.user_id = f.following_user_id
        LEFT JOIN 
            liketable l
        ON 
            t.tweet_id = l.tweet_id
        WHERE 
            f.follower_user_id = $1
        GROUP BY
            t.tweet_id,
            t.tweet,
            t.posted_at,
            u.user_id,
            u.name
        ORDER BY 
            t.posted_at DESC
        LIMIT 10;
    `;
  return await pool.query(query, [user_id]);
};

module.exports = { getUserByEmail, getUserByUsername, tweetsFeed };
