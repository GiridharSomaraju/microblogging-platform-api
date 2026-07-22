const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const middlewareFunction = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next(new AppError("Authentication token is required", 401));
  }
  const jwtToken = authHeader.split(" ")[1];
  jwt.verify(jwtToken, process.env.JWT_SECRET_KEY,  (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(
          new AppError("Token has expired. Please login again.", 401),
        );
      }

      // Invalid token
      if (err.name === "JsonWebTokenError") {
        return next(new AppError("Invalid authentication token.", 401));
      }

      // Any other JWT error
      return next(new AppError("Authentication failed.", 401));
    }
    req.user_id = payload.user_id;
    next();
  });
};

module.exports = middlewareFunction;
