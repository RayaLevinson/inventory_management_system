const { errorResponse } = require("./apiResponse.util");
const AppError = require("./appError.util");


/**
 * @description This function returns the error response
 */
module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    return errorResponse(err, res);
  }
};
