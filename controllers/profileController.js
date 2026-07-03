const pool = require("../config/db");

// get my profile API

const getMyProfile = async (req, res) => {
  try {
    const user_id = req.user_id;
    const getProfileQuery = `SELECT u.name,u.email,u.gender,u.created_at,
    (SELECT COUNT(*) FROM followertable WHERE following_user_id = u.user_id) AS followers,
    (SELECT COUNT(*) FROM followertable WHERE follower_user_id = u.user_id) AS following,
    (SELECT COUNT(*) FROM tweettable WHERE user_id = u.user_id) AS tweets
    FROM usertable u where u.user_id = $1;
    `;
    const resultProfile = await pool.query(getProfileQuery, [user_id]);
    if (resultProfile.rowCount === 0) {
      return res.status(404).json({
        message: "Profile Not Found",
      });
    }
    res.status(200).json({
      Profile: resultProfile.rows[0],
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

//get user profile API

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const getProfileQuery = `SELECT u.name,u.gender,u.created_at,
    (SELECT COUNT(*) FROM followertable WHERE following_user_id = u.user_id) AS followers,
    (SELECT COUNT(*) FROM followertable WHERE follower_user_id = u.user_id) AS following,
    (SELECT COUNT(*) FROM tweettable WHERE user_id = u.user_id) AS tweets
    FROM usertable u where u.user_id = $1;
    `;
    const resultProfile = await pool.query(getProfileQuery, [userId]);
    if (resultProfile.rowCount === 0) {
      return res.status(404).json({
        message: "Profile Not Found",
      });
    }
    res.status(200).json({
      Profile: resultProfile.rows[0],
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// get profile by search API

const searchProfile = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { name } = req.query;
    const getProfileQuery = `SELECT u.user_id,u.name,u.created_at,
    (SELECT COUNT(*) FROM followertable WHERE following_user_id = u.user_id) AS followers,
    (SELECT COUNT(*) FROM followertable WHERE follower_user_id = u.user_id) AS following,
    (SELECT COUNT(*) FROM tweettable WHERE user_id = u.user_id) AS tweets
    FROM usertable u where u.name ILIKE $1 AND u.user_id <> $2 LIMIT 10;
    `;
    const resultProfile = await pool.query(getProfileQuery, [
      `%${name}%`,
      user_id,
    ]);
    if (resultProfile.rowCount === 0) {
      return res.status(404).json({
        message: "Profile Not Found",
      });
    }
    res.status(200).json({
      Profile: resultProfile.rows,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// tweets feed API

const tweetsFeed = async (req, res) => {
  try {
    const user_id = req.user_id;
    const getProfileQuery = `SELECT
            t.tweet_id,
            t.tweet,
            t.posted_at,
            u.user_id,
            u.name,
            COUNT(l.tweet_id) AS likes
        FROM tweettable t
        INNER JOIN usertable u
            ON t.user_id = u.user_id
        INNER JOIN followertable f
            ON t.user_id = f.following_user_id
        LEFT JOIN liketable l
            ON t.tweet_id = l.tweet_id
        WHERE f.follower_user_id = $1
        GROUP BY
            t.tweet_id,
            t.tweet,
            t.posted_at,
            u.user_id,
            u.name
        ORDER BY t.posted_at DESC
        LIMIT 10;
    `;
    const resultProfile = await pool.query(getProfileQuery, [user_id]);
    if (resultProfile.rowCount === 0) {
      return res.status(404).json({
        message: "No Tweets Found",
      });
    }
    res.status(200).json({
      Feed: resultProfile.rows,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = { getMyProfile, getUserProfile, searchProfile, tweetsFeed };
