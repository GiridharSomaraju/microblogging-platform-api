const likeModel = require("../models/likeModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//like a tweet API

const likeTweet = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;
  const { tweetId } = req.params;

  const resultTweet = await likeModel.getLikeTweet(tweetId, user_id);
  if (resultTweet.rowCount != 0) {
    return next(new AppError("you already liked this tweet", 400));
  }

  await likeModel.insertLike(tweetId, user_id);
  res.status(201).json({
    success: true,
    message: "Successfully added a like to the specified tweet",
  });
});

// unlike a tweet API

const dislikeTweet = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;
  const { tweetId } = req.params;
  const resultTweet = await likeModel.getLikeTweet(tweetId, user_id);
  if (resultTweet.rowCount === 0) {
    return next(new AppError("you didn't liked this tweet", 400));
  }
  await likeModel.dislikeTweet(tweetId, user_id);
  res.status(200).json({
    success: true,
    message: "Successfully removed the like from the specified tweet",
  });
});

// tweet like count API

const likeCount = catchAsync(async (req, res, next) => {
  const { tweetId } = req.params;

  const result = await likeModel.likeCount(tweetId);
  res.status(200).json({
    success: true,
    count: result.rows[0].likesCount,
  });
});

module.exports = { likeTweet, dislikeTweet, likeCount };
