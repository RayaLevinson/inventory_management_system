const ModuleSerialNumber = require('@database/models/modules/parts/module.serialNumber.model')
const { successResponse } = require("@utils/apiResponse.util");
const tryCatchAsync = require("@utils/tryCatchAsync.util");
const { success } = require("@utils/statusCode.util").statusCode;
const AppError = require('@utils/appError.util')

exports.create = tryCatchAsync(async (req, res) => {
  let { name } = req.body;

  let moduleSerialNumber = await ModuleSerialNumber.create({ name })
  let response_data = { moduleSerialNumber }

  return successResponse(
    res,
    response_data,
    "New Serial Number has been created",
    success
  );
});

exports.update = tryCatchAsync(async (req, res) => {
  let { name, _id } = req.body;

  let moduleSerialNumber = await ModuleSerialNumber.findByIdAndUpdate(_id, { name })
  serialNumber = await ModuleSerialNumber.findById(moduleSerialNumber._id)

  let response_data = { serialNumber };

  return successResponse(
    res,
    response_data,
    "Serial Number  has been updated",
    success
  );
});

exports.delete = tryCatchAsync(async (req, res) => {
  let { _id } = req.params;

  let moduleSerialNumber = await ModuleSerialNumber.findByIdAndDelete(_id)

  let response_data = { moduleSerialNumber }

  return successResponse(
    res,
    response_data,
    "Serial Number  has been deleted",
    success
  );
});
exports.getAll = tryCatchAsync(async (req, res) => {
  let moduleSerialNumbers = await ModuleSerialNumber.find()
  let response_data = { moduleSerialNumbers };

  return successResponse(res, response_data, "", success);
});
