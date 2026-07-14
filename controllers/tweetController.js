const tweetModel = require("../models/tweetModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//insert tweet API
const insertTweet = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;
  const { tweet } = req.body;
  // model
  const createdTweet = await tweetModel.insertUserTweet(user_id, tweet);
  res.status(201).json({
    success: true,
    message: "Tweet posted successfully",
    tweet: createdTweet.rows[0],
  });
});

//Get all tweets
const getUserTweets = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const userTweets = await tweetModel.getTweetsByUser(user_id, limit, offset);
  if (userTweets.rowCount === 0) {
    return next(new AppError("You haven't posted any tweets yet.", 200));
  }
  res.status(200).json({
    page,
    limit,
    count: userTweets.rowCount,
    tweets: userTweets.rows,
  });
});

//Delete a tweet
const deleteUserTweet = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;
  const { tweetId } = req.params;
  const deleteTweet = await tweetModel.deleteTweetByUser(tweetId, user_id);
  if (deleteTweet.rowCount === 0) {
    return next(new AppError("Tweet not found or already deleted.", 404));
  }
  res.status(200).json({
    success: true,
    message: "Tweet deleted successfully",
  });
});

//API for selected tweets deletion
const deleteMultipleTweet = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;
  const { tweetId } = req.body;
  const result = await tweetId.deleteMultipleTweetsByUser(tweetId, user_id);
  res.status(200).json({
    success: true,
    message: "Tweets deleted successfully",
    deletedCount: result.rowCount,
  });
});

module.exports = {
  insertTweet,
  getUserTweets,
  deleteUserTweet,
  deleteMultipleTweet,
};
