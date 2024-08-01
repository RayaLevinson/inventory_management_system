const ModuleDescription = require("@database/models/modules/parts/module.description.model");
const { successResponse } = require('@utils/apiResponse.util')
const tryCatchAsync = require("@utils/tryCatchAsync.util");
const { success, notFound } = require("@utils/statusCode.util").statusCode;
const AppError = require('@utils/appError.util')

// Description of Module Controller

//@route    GET /api/descriptions
//@desc     Get all module descriptions
//@access   Public
exports.getAll = tryCatchAsync(async (req, res) => {
  const descriptions = await ModuleDescription.find();
  const response_data = { descriptions }

  return successResponse(res, response_data, "", success);
});


//@route    POST /api/descriptions
//@desc     Add a new module description
//@access   Public
exports.create = tryCatchAsync(async (req, res) => {
  const { name } = req.body

  const description = await ModuleDescription.create({ name })
  const response_data = { description }

  return successResponse(
    res,
    response_data,
    "New Module Description has been created.",
    success
  );
});


//@route    PUT /api/descriptions/_id
//@desc     Update an existed module description
//@access   Public
exports.update = tryCatchAsync(async (req, res, next) => {
  const { _id } = req.params
  const { name } = req.body

  const description = await ModuleDescription.findById(_id)

  if (!description) {
    return next(new AppError('Module Description not found.', notFound))
  }

  description.name = name;

  await description.save();
  let response_data = { description };

  return successResponse(
    res,
    response_data,
    "Module Description has been updated.",
    success
  );
});


//@route    DELETE /api/descriptions/_id
//@desc     Delete an existed description
//@access   Public
exports.delete = tryCatchAsync(async (req, res) => {
  const { _id } = req.params;

  const description = await ModuleDescription.findByIdAndDelete(_id)

  const response_data = { description }

  return successResponse(
    res,
    response_data,
    "Module Description has been deleted.",
    success
  );
});

