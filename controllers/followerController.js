const followerModel = require("../models/followerModel");

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
    const result = await followerModel.followUser(follower_user_id, userId);
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

    const resultFollower = await followerModel.getFollowUser(
      follower_user_id,
      userId,
    );
    if (resultFollower.rowCount === 0) {
      return res.status(404).json({
        message: "You are not following this user",
      });
    }
    const result = await followerModel.unfollowUser(follower_user_id, userId);
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
    const follower_user_id = req.user_id;

    const result = await followerModel.getFollowingUsers(follower_user_id);
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
    const follower_user_id = req.user_id;

    const result = await followerModel.getFollowedUsers(follower_user_id);
    if (result.rowCount === 0) {
      return res.status(200).json({
        followers: "You are not followed by any user yet",
      });
    }
    res.status(200).json({
      follwers: result.rows,
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
