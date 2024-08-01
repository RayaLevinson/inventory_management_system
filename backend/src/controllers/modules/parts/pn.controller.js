const ModulePartNumber = require('@database/models/modules/parts/module.pn.model')
const { successResponse } = require('@utils/apiResponse.util')
const tryCatchAsync = require('@utils/tryCatchAsync.util')
const { success, notFound } = require('@utils/statusCode.util').statusCode
const AppError = require('@utils/appError.util')

// Part Number of Module Controller

//@route    GET /api/pn
//@desc     Get all part numbers
//@access   Public
exports.getAll = tryCatchAsync(async (req, res) => {
  const pns = await ModulePartNumber.find()
  const response_data = { pns }

  return successResponse(res, response_data, '', success)
})

//@route    POST /api/pn
//@desc     Add a new part number
//@access   Public
exports.create = tryCatchAsync(async (req, res) => {
  const { name } = req.body

  const pn = await ModulePartNumber.create({ name })
  const response_data = { pn }

  return successResponse(res, response_data, 'Part Number has been created.', success)
})

//@route    PUT /api/pn/_id
//@desc     Update an existed part number
//@access   Public
exports.update = tryCatchAsync(async (req, res, next) => {
  const { _id } = req.params
  const { name } = req.body
  const pn = await ModulePartNumber.findById(_id)

  if (!pn) {
    return next(new AppError('Part Number not found.', notFound))
  }

  pn.name = name
  await pn.save()
  const response_data = { pn }

  return successResponse(res, response_data, 'Part Number has been updated.', success)
})

//@route    DELETE /api/pn/_id
//@desc     Update an existed part number
//@access   Public
exports.delete = tryCatchAsync(async (req, res) => {
  const { _id } = req.params

  const pn = await ModulePartNumber.findByIdAndDelete(_id)

  const response_data = { pn }

  return successResponse(res, response_data, 'Part Number has been deleted.', success)
})
