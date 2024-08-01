const Joi = require("joi");
const AppError = require("@utils/appError.util");
const { validateWithJoi } = require('@validations/validation.utils')
const { badRequest } = require("@utils/statusCode.util").statusCode;

// Create a new revision validation
module.exports.create = (req, res, next) => {
  try {
    const schema = Joi.object({
      pn_id: Joi.string().trim().required(),
      name: Joi.string().trim().required(),
    });
    req.body = validateWithJoi(schema, req.body);
    next();
  } catch (error) {
    throw new AppError(error.message, badRequest);
  }
};
