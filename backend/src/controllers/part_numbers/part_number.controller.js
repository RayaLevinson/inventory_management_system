const { successResponse } = require('@utils/apiResponse.util')
const PartNumber = require('@database/models/part_numbers/part_number.model')
const tryCatchAsync = require('@utils/tryCatchAsync.util')
const { success, notFound } = require('@utils/statusCode.util').statusCode
const AppError = require('@utils/appError.util')

// Part Number Controller

//@route    GET /api/part_numbers
//@desc     Get all part numbers
//@access   Public
exports.getAll = tryCatchAsync(async (req, res) => {
const part_numbers = await PartNumber.find()
  .populate('type_id')
  .populate('material_id')

  const response_data = { part_numbers }

  return successResponse(res, response_data, '', success)
})

//@route    POST /api/part_numbers
//@desc     Add a new part number
//@access   Public
exports.create = tryCatchAsync(async (req, res) => {
  const payload = req.body

  const part_number = await PartNumber.create(payload)
  const response_data = { part_number }

  return successResponse(res, response_data, 'Part Number has been created.', success)
})

//@route    PUT /api/part_numbers/_id
//@desc     Update an existed part number
//@access   Public
exports.update = tryCatchAsync(async (req, res, next) => {
  const { _id } = req.params
  const { name } = req.body
  const part_number = await PartNumber.findById(_id)

  if (!part_number) {
    return next(new AppError('Part Number not found.', notFound))
  }

  part_number.name = name
  await part_number.save()
  const response_data = { part_number }

  return successResponse(res, response_data, 'Part Number has been updated.', success)
})

//@route    DELETE /api/part_numbers/_id
//@desc     Update an existed part number
//@access   Public
exports.delete = tryCatchAsync(async (req, res) => {
  const { _id } = req.params

  const part_number = await PartNumber.findByIdAndDelete(_id)

  const response_data = { part_number }

  return successResponse(res, response_data, 'Part Number has been deleted.', success)
})
