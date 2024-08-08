const { ErrorResponse } = require("./apiResponse.util");
const AppError = require("./appError.util");

/**
 * @description This function returns the error response
 */
module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    return ErrorResponse(err, res)
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    err.message = 'Resource not found.'
    return ErrorResponse(err, res)
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    return ErrorResponse(err, res)
  }
};
