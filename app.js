const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

//routes
const userRoutes = require("./routes/userRoutes");
const tweetRoutes = require("./routes/tweetRoutes");
const followerRoutes = require("./routes/followerRoutes");
const likeRoutes = require("./routes/likeRoutes");
const replyRoutes = require("./routes/replyRoutes");
const profileRoutes = require("./routes/profileRoutes");

// errorHandle middleware

const AppError = require("./utils/AppError");
const errorHandler = require("./middleware/errorHandler");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const app = express();

app.use(express.json());

app.disable("x-powered-by"); // Hide Express

app.use(helmet()); // Add security headers

app.use(morgan("dev"));

//app.use(loggerMiddleware);

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

app.use("/", userRoutes);
app.use("/", tweetRoutes);
app.use("/", followerRoutes);
app.use("/", likeRoutes);
app.use("/", replyRoutes);
app.use("/", profileRoutes);

app.all("/{*splat}", (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

module.exports = app;
