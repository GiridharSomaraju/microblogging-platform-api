
const profileModel = require("../models/profileModel");

// get my profile API

const getMyProfile = async (req, res) => {
  try {
    const user_id = req.user_id;

    const resultProfile = await profileModel.getUserByEmail(user_id);

    if (resultProfile.rowCount === 0) {
      return res.status(404).json({
        message: "Profile Not Found",
      });
    }
    res.status(200).json({
      Profile: resultProfile.rows[0],
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

//get user profile API

const getProfileById = async (req, res) => {
  try {
    const { userId } = req.params;

    const resultProfile = await profileModel.getUserByEmail(userId);
    if (resultProfile.rowCount === 0) {
      return res.status(404).json({
        message: "Profile Not Found",
      });
    }
    res.status(200).json({
      Profile: resultProfile.rows[0],
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// get profile by search API

const searchProfile = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { name } = req.query;

    const resultProfile = await profileModel.getUserByUsername(name, user_id);
    if (resultProfile.rowCount === 0) {
      return res.status(404).json({
        message: "Profile Not Found",
      });
    }
    res.status(200).json({
      Profile: resultProfile.rows,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// tweets feed API

const tweetsFeed = async (req, res) => {
  try {
    const user_id = req.user_id;

    const resultProfile = await profileModel.tweetsFeed(user_id);
    if (resultProfile.rowCount === 0) {
      return res.status(404).json({
        message: "No Tweets Found",
      });
    }
    res.status(200).json({
      Feed: resultProfile.rows,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = { getMyProfile, getProfileById, searchProfile, tweetsFeed };
