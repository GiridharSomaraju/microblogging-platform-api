const replyModel = require("../models/replyModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

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

  const replies = await replyModel.getReplies(tweetId);
  if (replies.rowCount === 0) {
    return next(new AppError("No replies for this tweet", 200));
  }
  res.status(200).json({
    success: true,
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
