const ModuleStatus = require('@database/models/modules/parts/module.status.model')
const { successResponse } = require('@utils/apiResponse.util')
const tryCatchAsync = require('@utils/tryCatchAsync.util')
const { success } = require('@utils/statusCode.util').statusCode
const AppError = require('@utils/appError.util')

// Status of Module Controller

//@route    GET /api/statuses
//@desc     Get all module statuses
//@access   Public
exports.getAll = tryCatchAsync(async (req, res) => {
  const status = await ModuleStatus.find()
  const response_data = { status }

  return successResponse(res, response_data, '', success)
})

//@route    POST /api/statuses
//@desc     Add a new module status
//@access   Public
exports.create = tryCatchAsync(async (req, res) => {
  let { name } = req.body

  let status = await ModuleStatus.create({ name })
  let response_data = { status }

  return successResponse(res, response_data, 'New Status has been created.', success)
})

//@route    PUT /api/statuses/_id
//@desc     Update an existed module status
//@access   Public
exports.update = tryCatchAsync(async (req, res, next) => {
  let { name, _id } = req.body

  let status = await ModuleStatus.findById(_id)

  if (!status) {
    return next(new AppError('Module Status not found.', notFound))
  }

  status.name = name
  await status.save()
  let response_data = { status }

  return successResponse(res, response_data, 'Status has been updated.', success)
})

//@route    DELETE /api/statuses/_id
//@desc     Delete an existed status of module by status _id
//@access   Public
exports.delete = tryCatchAsync(async (req, res) => {
  let { _id } = req.params

  let status = await ModuleStatus.findByIdAndDelete(_id)

  let response_data = { status }

  return successResponse(res, response_data, 'Status has been deleted.', success)
})

