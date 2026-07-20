const handlePostgreError = require("../utils/handlePostgreError");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.code) {
    err = handlePostgreError(err);
  }
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "error";

  const message =
    err.statusCode === 500
      ? "Something went wrong. Please try again later"
      : err.message;

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message,
  });
};

module.exports = errorHandler;
