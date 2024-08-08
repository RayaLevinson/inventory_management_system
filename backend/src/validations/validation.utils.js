// Validation utility function

/**
 * @description Validation utility function. Validates data against a given Joi schema.
 * @param {Joi.Schema} schema - The Joi schema object to validate against.
 * @param {Object} data - The data to be validated.
 * @returns {Object} - The result of the validation. 
 *    If the validation is successful, returns an object containing the validated data.
 *    If the validation fails, returns an object containing the error details.
 */
function validateWithJoi(schema, data) {
  const options = {
    abortEarly: false,      // include all errors
    allowUnknown: true,     // ignore unknown props
    stripUnknown: true,     // remove unknown props
  };
  const { error, value } = schema.validate(data, options);

  if (error) {
    let errorMessage = "";
    for (const err of error.details) {
      errorMessage +=
        "" +
        err.path.join(" > ") +
        err.message.slice(err.message.lastIndexOf('"') + 1) +
        ", ";
    }
    throw new Error(errorMessage);
  } else {
    return value;
  }
}

module.exports = {
  validateWithJoi
};
