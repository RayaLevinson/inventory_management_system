const ModuleState = require('@database/models/modules/parts/module.state.model')
const { successResponse } = require('@utils/apiResponse.util')
const tryCatchAsync = require('@utils/tryCatchAsync.util')
const { success } = require('@utils/statusCode.util').statusCode
const AppError = require('@utils/appError.util')

exports.create = tryCatchAsync(async (req, res) => {
  let { name } = req.body

  let state = await ModuleState.create({ name })
  let response_data = { state }

  return successResponse(res, response_data, 'New State has been created', success)
})

exports.update = tryCatchAsync(async (req, res, next) => {
  let { name, _id } = req.body

  let state = await ModuleState.findById(_id)
  state.name = name
  await state.save()
  let response_data = { state }

  return successResponse(res, response_data, 'State has been updated', success)
})

exports.delete = tryCatchAsync(async (req, res) => {
  let { _id } = req.params

  let state = await ModuleState.findByIdAndDelete(_id)

  let response_data = { state }

  return successResponse(res, response_data, 'State has been deleted', success)
})
exports.getAll = tryCatchAsync(async (req, res) => {
  let states = await ModuleState.find()
  let response_data = { states }

  return successResponse(res, response_data, '', success)
})
