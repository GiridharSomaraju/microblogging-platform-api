const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

//user register
const userRegister = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    const dbUser = await userModel.getUser(email);
    if (dbUser.rows.length !== 0) {
      return res.status(401).json({
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.insertUser(name, email, hashedPassword, gender);
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

//login user

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbUser = await userModel.getUser(email);
    if (dbUser.rows.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const userDetails = dbUser.rows[0];
    //  password checking
    const isPasswordMatched = await bcrypt.compare(
      password,
      userDetails.password,
    );
    if (isPasswordMatched) {
      // payload
      const payload = {
        user_id: userDetails.user_id,
      };
      // token generation
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      // response
      res.status(200).json({
        jwtToken: jwtToken,
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

module.exports = { userRegister, userLogin };
