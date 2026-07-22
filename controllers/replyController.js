const replyModel = require("../models/replyModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { query } = require("express-validator");
const { paginationMetadata } = require("../utils/paginationMetadata");

// reply tweet API
const replyTweet = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;
  const { tweetId } = req.params;
  const { reply } = req.body;

  await replyModel.replyTweet(reply, tweetId, user_id);
  res.status(201).json({
    success: true,
    message: "Reply Inserted Successfully",
  });
});

// get reply API
const getReplies = catchAsync(async (req, res, next) => {
  const { tweetId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const [replies, replyCount] = await Promise.all([
    await replyModel.getReplies(tweetId, limit, offset),
    await replyModel.getReplyCount(tweetId),
  ]);

  const totalItems = replyCount.rows[0].total;
  const pagination = await paginationMetadata(page, limit, totalItems);

  res.status(200).json({
    success: true,
    pagination,
    replies: replies.rows,
  });
});

// delete reply API

const deleteReply = catchAsync(async (req, res, next) => {
  const user_id = req.user_id;
  const { replyId } = req.params;

  const result = await replyModel.deleteReply(replyId, user_id);
  if (result.rowCount === 0) {
    return next(
      new AppError(
        "Reply not found or you are not authorized to delete it.",
        404,
      ),
    );
  }
  res.status(200).json({
    success: true,
    message: "Reply Deleted Successfully",
  });
});

module.exports = { replyTweet, getReplies, deleteReply };
