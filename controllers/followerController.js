const followerModel = require("../models/followerModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { paginationMetadata } = require("../utils/paginationMetadata");
const pool = require("../config/db");

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
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const [result, totalFollowing] = await Promise.all([
    await followerModel.getFollowingUsers(follower_user_id, limit, offset),
    await followerModel.getTotalFollowing(follower_user_id),
  ]);

  const totalItems = totalFollowing.rows[0].total;

  const pagination = await paginationMetadata(page, limit, totalItems);

  res.status(200).json({
    success: true,
    pagination,
    followingUsers: result.rows,
  });
});

// get my followers  API

const getFollowedUsers = catchAsync(async (req, res, next) => {
  const follower_user_id = req.user_id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const [result, totalFollowers] = await Promise.all([
    await followerModel.getFollowedUsers(follower_user_id, limit, offset),
    await followerModel.getTotalFollowers(follower_user_id),
  ]);

  const totalItems = totalFollowers.rows[0].total;

  const pagination = await paginationMetadata(page, limit, totalItems);

  res.status(200).json({
    success: true,
    pagination,
    followers: result.rows,
  });
});

module.exports = {
  followUser,
  unfollowUser,
  getFollowedUsers,
  getFollowingUsers,
};
