const { param, query, body } = require("express-validator");

const tweetValidation = [
  body("tweet").trim().notEmpty().withMessage("Tweet not empty"),
];

const deleteTweetValidation = [
  param("tweetId").isInt({ min: 1 }).withMessage("Tweet ID must be Integer"),
];

const paginationValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

const multiTweetDeleteValidation = [
  body("tweetId").isArray({ min: 1 }).withMessage("TweetId's must be an Array"),
];

module.exports = {
  tweetValidation,
  deleteTweetValidation,
  multiTweetDeleteValidation,
  paginationValidation,
};
