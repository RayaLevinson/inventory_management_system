/**
 * @description: Custom error class to handle operational errors.
 *  The AppError class extends the Error class and adds a few properties to it.
 *  The AppError class is used to handle operational errors in the application.
*/
class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.isOperational = true
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error' // 4xx client error, 5xx server error
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
