const profileModel = require("../models/profileModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// get my profile API

const getMyProfile = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;

  const resultProfile = await profileModel.getUserByEmail(user_id);

  if (resultProfile.rowCount === 0) {
    return next(new AppError("Profile Not Found", 404));
  }
  res.status(200).json({
    success: true,
    Profile: resultProfile.rows[0],
  });
});

//get user profile API

const getProfileById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const resultProfile = await profileModel.getUserByEmail(userId);
  if (resultProfile.rowCount === 0) {
    return next(new AppError("Profile Not Found", 404));
  }
  res.status(200).json({
    success: true,
    Profile: resultProfile.rows[0],
  });
});

// get profile by search API

const searchProfile = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;
  const { name } = req.query;

  const resultProfile = await profileModel.getUserByUsername(name, user_id);
  if (resultProfile.rowCount === 0) {
    return next(new AppError("Profile Not Found", 404));
  }
  res.status(200).json({
    success: true,
    Profile: resultProfile.rows,
  });
});

// tweets feed API

const tweetsFeed = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;

  const resultProfile = await profileModel.tweetsFeed(user_id);
  if (resultProfile.rowCount === 0) {
    return next(new AppError("No Tweets Found", 404));
  }
  res.status(200).json({
    success: true,
    Feed: resultProfile.rows,
  });
});

module.exports = { getMyProfile, getProfileById, searchProfile, tweetsFeed };
