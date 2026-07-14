require("dotenv").config();

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

//console.log(JSON.stringify(swaggerSpec, null, 2));

const pool = require("./config/db");
const express = require("express");

//routes
const userRoutes = require("./routes/userRoutes");
const tweetRoutes = require("./routes/tweetRoutes");
const followerRoutes = require("./routes/followerRoutes");
const likeRoutes = require("./routes/likeRoutes");
const replyRoutes = require("./routes/replyRoutes");
const profileRoutes = require("./routes/profileRoutes");

// errorHandle middleware

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/api-docs", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(
  "/api-docs",
  swaggerUI.serveFiles(swaggerSpec),
  swaggerUI.setup(swaggerSpec),
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Microblogging Platform API is running",
    documentation: "/api-docs",
  });
});

app.get("/test-error", (req, res, next) => {
  next(new Error("Testing global Error Handler"));
});

app.use("/", userRoutes);
app.use("/", tweetRoutes);
app.use("/", followerRoutes);
app.use("/", likeRoutes);
app.use("/", replyRoutes);
app.use("/", profileRoutes);

app.use(errorHandler);

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
