const Joi = require('joi')
const AppError = require('@utils/appError.util')
const { validateWithJoi } = require('@validations/validation.utils')
const { badRequest } = require('@utils/statusCode.util').statusCode

// Create a new item validation
module.exports.create = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().trim().required() 
    })
    validateWithJoi(schema, req.body)
    next()
  } catch (error) {
    throw new AppError(error.message, badRequest)
  }
}

// Update an item validation
module.exports.update = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().trim().required()
    })
    validateWithJoi(schema, req.body)

    next()
  } catch (error) {
    throw new AppError(error.message, badRequest)
  }
}

// Delete an item validation
module.exports.delete = (req, res, next) => {
  try {
    const schema = Joi.object({
      _id: Joi.string().trim().required()
    });
    req.params = validateWithJoi(schema, req.params);
    next()
  } catch (error) {
    throw new AppError(error.message, badRequest)
  }
}
