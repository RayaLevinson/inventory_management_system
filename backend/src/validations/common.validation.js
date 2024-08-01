const Joi = require("joi");
const AppError = require("@utils/appError.util");
const { validateWithJoi } = require("./validation.utils");
const { badRequest } = require("@utils/statusCode.util").statusCode;

// Create a new item validation
module.exports.create = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().trim().required(),  // TODO
    });
    req.body = validateWithJoi(schema, req.body);
    next();
  } catch (error) {
    throw new AppError(error.message, badRequest);
  }
};

// Update a item validation
module.exports.update = (req, res, next) => {
  try {    
    const schema = Joi.object({
      name: Joi.string().trim().required()
    })
    req.body = validateWithJoi(schema , req.body)

    next();
  } catch (error) {
    throw new AppError(error.message, badRequest);
  }
};

// Delete an item validation
module.exports.delete = (req, res, next) => {
  try {
    const schema = Joi.object({
      _id: Joi.string().trim().required()
    });
    req.params = validateWithJoi(schema, req.params);
    next();
  } catch (error) {
    throw new AppError(error.message, badRequest);
  }
};
