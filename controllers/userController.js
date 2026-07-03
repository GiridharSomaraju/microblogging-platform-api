const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//user register
const registerUser = async (req, res) => {
  const { name, email, password, gender } = req.body;
  const userQuery = `SELECT * FROM usertable WHERE email = $1`;
  const dbUser = await pool.query(userQuery, [email]);
  if (dbUser.rows.length !== 0) {
    res.status(401).json({
      message: "user already exists",
    });
  } else {
    if (password.length < 8) {
      res.status(401).send("password is too short");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = `INSERT INTO usertable(name,email,password,gender)
            VALUES($1,$2,$3,$4)`;
      await pool.query(insertQuery, [name, email, hashedPassword, gender]);
      res.status(200).json({
        message: "User registered successfully",
      });
    }
  }
};

//login user

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const userQuery = `SELECT * FROM usertable WHERE email = $1`;
  const dbUser = await pool.query(userQuery, [email]);
  if (dbUser.rows.length === 0) {
    res.status(404).json({
      message: "user not found",
    });
  } else {
    const userDetails = dbUser.rows[0];
    const isPasswordMatched = await bcrypt.compare(
      password,
      userDetails.password,
    );
    if (isPasswordMatched) {
      const payload = {
        user_id: userDetails.user_id,
      };
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({
        jwtToken: jwtToken,
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  }
};

module.exports = { registerUser, userLogin };
