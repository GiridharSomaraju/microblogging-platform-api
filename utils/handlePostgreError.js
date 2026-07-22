const AppError = require("./AppError");

const handlePostgreError = (err) => {
  switch (err.code) {
    case "23505":
      return new AppError("Email Already Exists", 409);
    case "23503":
      return new AppError("Reference resource doesn't exists", 400);
    case "23502":
      return new AppError("Required field is missing", 400);
    case "23514":
      return new AppError("Invalid Value provided", 400);
    case "22P02":
      return new AppError("Invalid ID format", 400);
    default:
      return err;
  }
};

module.exports = handlePostgreError;
