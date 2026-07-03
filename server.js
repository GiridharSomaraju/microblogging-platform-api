require("dotenv").config();

const pool = require("./config/db");
const express = require("express");

//routes
const userRoutes = require("./routes/userRoutes");
const tweetRoutes = require("./routes/tweetRoutes");
const followerRoutes = require("./routes/followerRoutes");
const likeRoutes = require("./routes/likeRoutes");
const replyRoutes = require("./routes/replyRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(express.json());

app.use("/", userRoutes);
app.use("/", tweetRoutes);
app.use("/", followerRoutes);
app.use("/", likeRoutes);
app.use("/", replyRoutes);
app.use("/", profileRoutes);

const databaseServerConnection = async () => {
  try {
    await pool.query("SELECT NOW()");

    app.listen(process.env.PORT, () => {
      console.log(`server running at port ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(`DB error : ${e.message}`);
    process.exit(1);
  }
};

databaseServerConnection();
