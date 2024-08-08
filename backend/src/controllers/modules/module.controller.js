const Module = require('@database/models/modules/module.model')
const { successResponse } = require('@utils/apiResponse.util')
const tryCatchAsync = require('@utils/tryCatchAsync.util')
const { success } = require('@utils/statusCode.util').statusCode
const AppError = require('@utils/appError.util')
// const { processData } = require('@services/module.dataProcessing.service')


exports.create = tryCatchAsync(async (req, res) => {
  const payload = req.body

  let module = await Module.create(payload)
  module = await Module.findById(module._id)
    .populate('description_id')
    .populate('part_number_id')
    .populate('revision_id')
    .populate('status_id')
    .populate('state_id')
  const response_data = { module }

  return successResponse(res, response_data, 'Module has been created.', success)
})


// exports.createMany = tryCatchAsync(async (req, res) => {
//   let { list } = req.body

//   let modules = await processData(list)
//   await Module.insertMany(modules)

//   let response_data = { modules }

//   return successResponse(res, response_data, 'Module has been created', success)
// })


exports.update = tryCatchAsync(async (req, res, next) => {
  let { _id, ...rest } = req.body

  let module = await Module.findByIdAndUpdate(_id, rest)
  module = await Module.findById(module._id)
    .populate('description_id')
    .populate('revision_id')
    .populate('pn_id')
    .populate('state_id')
    .populate('status_id')

  let response_data = { module }

  return successResponse(res, response_data, 'Module has been updated', success)
})

exports.delete = tryCatchAsync(async (req, res) => {
  let { _id } = req.params

  let module = await Module.findByIdAndDelete(_id)

  let response_data = { module }

  return successResponse(res, response_data, 'Module has been deleted', success)
})

exports.getByFilter = tryCatchAsync(async (req, res) => {
  const { page, page_size, ...rest } = req.body
  const query = { ...rest }
  if (query.date) {
    query.date = {
      $gte: new Date(`${query.date}T00:00:00.0000Z`),
      $lte: new Date(`${query.date}T23:59:59.99999Z`)
    }
  }
  const skip = (page - 1) * page_size
  let modules = await Module.find(query)
    .skip(skip)
    .limit(page_size)
    .sort({ createdAt: -1 })
    .populate('revision_id')
    .populate('pn_id')
    .populate('state_id')
    .populate('status_id')
    .exec()
  let count = await Module.countDocuments(query)

  let response_data = { modules, count }

  return successResponse(res, response_data, '', success)
})

exports.getAllByIds = tryCatchAsync(async (req, res) => {
  const { ids } = req.body

  let modules = await Module.find({ _id: { $in: ids } })
    .populate('description_id')
    .populate('revision_id')
    .populate('pn_id')
    .populate('state_id')
    .populate('status_id')

    .exec()

  let response_data = { modules }

  return successResponse(res, response_data, '', success)
})
