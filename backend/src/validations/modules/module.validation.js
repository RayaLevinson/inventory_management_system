const Joi = require("joi");
const AppError = require("@utils/appError.util");
const { validateWithJoi } = require("../validation.utils");
const { badRequest } = require("@utils/statusCode.util").statusCode;

// Create a new module validation
module.exports.create = (req, res, next) => {
  try {
    const schema = Joi.object({
      description_id: Joi.string().trim().required(),
      part_number_id: Joi.string().trim().required(),
      revision_id: Joi.string().trim().required(),
      status_id: Joi.string().trim().required(),
      state_id: Joi.string().trim().required(),
      firmware1: Joi.string().trim(),
      firmware2: Joi.string().trim(),
      firmware3: Joi.string().trim(),
      serial_number: Joi.string().trim(),
      comments: Joi.string().trim(),
    })
    req.body = validateWithJoi(schema, req.body)
    next()
  } catch (error) {
    throw new AppError(error.message, badRequest)
  }
};
