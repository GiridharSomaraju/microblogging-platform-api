const errorHandler = (err, req, res, next) => { 
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "error";

  const message =
    err.message === 500
      ? "Something went wrong. Please try again later"
      : err.message;

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message,
  });
};

module.exports = errorHandler;
