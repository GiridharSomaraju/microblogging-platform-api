const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//user register
const userRegister = catchAsync(async (req, res, next) => {
  const { name, email, password, gender } = req.body;
  const dbUser = await userModel.getUser(email);
  if (dbUser.rows.length !== 0) {
    return next(new AppError("Email Already Exists", 409));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.insertUser(name, email, hashedPassword, gender);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

//login user

const userLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const dbUser = await userModel.getUser(email);
  if (dbUser.rows.length === 0) {
    return next(new AppError("User not Found", 404));
  }
  const userDetails = dbUser.rows[0];
  //  password checking
  const isPasswordMatched = await bcrypt.compare(
    password,
    userDetails.password,
  );
  if (!isPasswordMatched) {
    return next(new AppError("Invalid Credentials", 401));
  }
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
    success: true,
    jwtToken: jwtToken,
  });
});

module.exports = { userRegister, userLogin };
