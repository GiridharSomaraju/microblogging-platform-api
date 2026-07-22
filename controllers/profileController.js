const profileModel = require("../models/profileModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { paginationMetadata } = require("../utils/paginationMetadata");

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
  const sort = req.query.sort || "latest";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const allowedSorts = ["latest", "oldest"];

  if (!allowedSorts.includes(sort)) {
    return next(
      new AppError(
        "Invalid sort option. Allowed values are latest, oldest",
        400,
      ),
    );
  }

  // execute both queries in parallel
  const [resultFeed, countResult] = await Promise.all([
    profileModel.tweetsFeed(user_id, offset, limit, sort),
    profileModel.countResult(user_id),
  ]);

  const totalItems = countResult.rows[0].total;

  //pagination metadata
  const pagination = await paginationMetadata(page, limit, totalItems);

  res.status(200).json({
    success: true,
    sort,
    pagination,
    feed: resultFeed.rows,
  });
});

module.exports = { getMyProfile, getProfileById, searchProfile, tweetsFeed };
