const TypeOfMaterial = require("@database/models/materials/parts/type_of_material.model");
const tryCatchAsync = require("@utils/tryCatchAsync.util");
const AppError = require('@utils/appError.util')
const { successResponse } = require('@utils/apiResponse.util')
const { success, notFound } = require("@utils/statusCode.util").statusCode;

// Type of Material Controller

//@route    POST /api/materials/types
//@desc     Add a new material type
//@access   Public
exports.create = tryCatchAsync(async (req, res) => {
  const { name } = req.body

  const materialType = await TypeOfMaterial.create({ name })
  const response_data = { materialType }

  return successResponse(res, response_data, 'New Material Type has been created.', success)
});

//@route    PUT /api/materials/types/_id
//@desc     Update an existed material type
//@access   Public
exports.update = tryCatchAsync(async (req, res, next) => {
  const { _id } = req.params
  const { name } = req.body

  const materialType = await TypeOfMaterial.findById(_id)

  if (!materialType) {
    return next(new AppError('Type Of Material not found.', notFound))
  }

  materialType.name = name;

  await materialType.save();
  let response_data = { materialType };

  return successResponse(
    res,
    response_data,
    "TypeOfMaterial has been updated.",
    success
  );
});

//@route    DELETE /api/materials/types/all
//@desc     Delete all materials
//@access   Public
exports.deleteAll = async (req, res) => {
  const result = await TypeOfMaterial.deleteMany({})

  let deletedCount = result.deletedCount // Number of documents deleted
  deletedCount = deletedCount || 0

  const response_data = { deletedCount }

  return successResponse(res, response_data, `All ${deletedCount} Material Types were deleted.`, success)
};

//@route    DELETE /api/materials/types/id
//@desc     Delete an existed material type
//@access   Public
exports.delete = tryCatchAsync(async (req, res) => {
  const { _id } = req.params;

  const materialType = await TypeOfMaterial.findByIdAndDelete(_id)

  const response_data = { materialType }

  return successResponse(
    res,
    response_data,
    "Type Of Material has been deleted.",
    success
  );
});

//@route    GET /api/materials/types
//@desc     Get all materials types
//@access   Public
exports.getAll = tryCatchAsync(async (req, res) => {
  const materialTypes = await TypeOfMaterial.find();
  const response_data = { materialTypes }

  return successResponse(res, response_data, "", success);
});