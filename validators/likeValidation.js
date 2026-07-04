const {param} = require("express-validator")

const likeTweetValidation = [
    param("tweetId").isInt().withMessage("Tweet Id must be an Integer")
]

module.exports = likeTweetValidation