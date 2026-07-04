const { body, param } = require("express-validator");

const replyTweetValidation = [
  body("reply").trim().notEmpty().withMessage("Reply should not be empty"),
  param("tweetId").isInt().withMessage("Tweet Id must be an Integer"),
];

const getRepliesValidation = [
  param("tweetId").isInt().withMessage("Tweet Id must be an Integer"),
];

const deleteReplyValidation = [
  param("replyId").isInt().withMessage("Tweet Id must be an Integer"),
];

module.exports = {
  replyTweetValidation,
  getRepliesValidation,
  deleteReplyValidation,
};
