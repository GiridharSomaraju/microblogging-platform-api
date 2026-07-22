const { body, param, query } = require("express-validator");

const replyTweetValidation = [
  body("reply").trim().notEmpty().withMessage("Reply should not be empty"),
  param("tweetId").isInt().withMessage("Tweet Id must be an Integer"),
];

const getRepliesValidation = [
  param("tweetId").isInt().withMessage("Tweet Id must be an Integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

const deleteReplyValidation = [
  param("replyId").isInt().withMessage("Tweet Id must be an Integer"),
];

module.exports = {
  replyTweetValidation,
  getRepliesValidation,
  deleteReplyValidation,
};
