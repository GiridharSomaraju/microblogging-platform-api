const followerModel = require("../models/followerModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//follower API

const followUser = catchAsync(async (req, res, next) => {
  const follower_user_id = req.user_id;
  const { userId } = req.params;
  if (follower_user_id === Number(userId)) {
    return next(new AppError("You cannot follow yourself", 400));
  }
  const result = await followerModel.followUser(follower_user_id, userId);
  res.status(201).json({
    success: true,
    message: "Successfully started following the specified user",
  });
});

//unfollow a user API

const unfollowUser = catchAsync(async (req, res, next) => {
  const follower_user_id = req.user_id;
  const { userId } = req.params;
  if (follower_user_id === Number(userId)) {
    return next(new AppError("You cannot unfollow yourself", 400));
  }

  const resultFollower = await followerModel.getFollowUser(
    follower_user_id,
    userId,
  );
  if (resultFollower.rowCount === 0) {
    return next(new AppError("You are not following this user", 404));
  }
  const result = await followerModel.unfollowUser(follower_user_id, userId);
  res.status(200).json({
    success: true,
    message: "user unfollowed successfully",
  });
});

// get following users API

const getFollowingUsers = catchAsync(async (req, res, next) => {
  const follower_user_id = req.user_id;

  const result = await followerModel.getFollowingUsers(follower_user_id);
  if (result.rowCount === 0) {
    return next(new AppError("You are not following any user yet", 200));
  }
  res.status(200).json({
    success: true,
    followingUsers: result.rows,
  });
});

// get my followers  API

const getFollowedUsers = catchAsync(async (req, res, next) => {
  const follower_user_id = req.user_id;

  const result = await followerModel.getFollowedUsers(follower_user_id);
  if (result.rowCount === 0) {
    return next(new AppError("You are not followed by any user yet", 200));
  }
  res.status(200).json({
    success: true,
    follwers: result.rows,
  });
});

module.exports = {
  followUser,
  unfollowUser,
  getFollowedUsers,
  getFollowingUsers,
};
