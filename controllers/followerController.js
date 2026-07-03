const pool = require("../config/db");

//follower API

const followUser = async (req, res) => {
  try {
    const follower_user_id = req.user_id;
    const { userId } = req.params;
    if (follower_user_id === Number(userId)) {
      return res.status(400).send({
        message: "You cannot follow yourself",
      });
    }

    const insertFollower = `INSERT INTO followertable(follower_user_id,following_user_id)
        VALUES($1,$2)`;
    const result = await pool.query(insertFollower, [follower_user_id, userId]);
    res.status(200).json({
      message: "user followed successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

//unfollow a user API

const unfollowUser = async (req, res) => {
  try {
    const follower_user_id = req.user_id;
    const { userId } = req.params;
    if (follower_user_id === Number(userId)) {
      return res.status(400).json({
        message: "You cannot unfollow yourself",
      });
    }
    const getFollowerQuery = `SELECT * FROM followertable WHERE follower_user_id = $1 AND following_user_id = $2;`;
    const resultFollower = await pool.query(getFollowerQuery, [
      follower_user_id,
      userId,
    ]);
    if (resultFollower.rowCount === 0) {
      return res.status(404).json({
        message: "You are not following this user",
      });
    }
    const deleteUser = `DELETE FROM followertable WHERE follower_user_id = $1 AND following_user_id = $2`;
    const result = await pool.query(deleteUser, [follower_user_id, userId]);
    res.status(200).json({
      message: "user unfollowed successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

// get following users API

const getFollowingUsers = async (req, res) => {
  try {
    const follower_user_id = req.userId;
    const followingResultQuery = `SELECT u.user_id,u.name FROM followertable f INNER JOIN usertable u ON f.following_user_id = u.user_id
        WHERE follower_user_id = $1`;
    const result = await pool.query(followingResultQuery, [follower_user_id]);
    if (result.rowCount === 0) {
      return res.status(200).json({
        message: "You are not following any user yet",
      });
    }
    res.status(200).json({
      followingUsers: result.rows,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// get my followers  API

const getFollowedUsers = async (req, res) => {
  try {
    const follower_user_id = req.userId;
    const followersResultQuery = `SELECT u.user_id,u.name FROM followertable f INNER JOIN usertable u ON f.follower_user_id = u.user_id
        WHERE following_user_id = $1`;
    const result = await pool.query(followersResultQuery, [follower_user_id]);
    if (result.rowCount === 0) {
      return res.status(200).json({
        followers: "You are not followed by any user yet",
      });
    }
    res.status(200).json({
      message: result.rows,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowedUsers,
  getFollowingUsers,
};
