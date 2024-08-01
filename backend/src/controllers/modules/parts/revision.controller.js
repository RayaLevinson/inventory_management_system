const ModuleRevision = require('@database/models/modules/parts/module.revision.model')
const { successResponse } = require('@utils/apiResponse.util')
const tryCatchAsync = require('@utils/tryCatchAsync.util')
const { success } = require('@utils/statusCode.util').statusCode
const AppError = require('@utils/appError.util')

// Revision of Part Number of Module Controller 

//@route    GET /api/revisions
//@desc     Get all revisions of part number
//@access   Public
exports.getAll = tryCatchAsync(async (req, res) => {
  const revisions = await ModuleRevision.find().populate('pn_id')

  const response_data = { revisions }

  return successResponse(res, response_data, '', success)
})

//@route    POST /api/revisions
//@desc     Add a new revision of part number
//@access   Public
exports.create = tryCatchAsync(async (req, res) => {
  const { name, pn_id } = req.body

  let revision = await ModuleRevision.create({ name, pn_id })

  revision = await ModuleRevision.findById(revision._id).populate('pn_id')

  const response_data = { revision }

  return successResponse(res, response_data, 'New Revision has been created.', success)
})

//@route    PUT /api/revisions/_id
//@desc     Update an existed revision of part number
//@access   Public
exports.update = tryCatchAsync(async (req, res, next) => {
  const _id = req.params.id

  const { name, pn_id } = req.body

  let revision = await ModuleRevision.findByIdAndUpdate(_id, { name, pn_id })
  revision = await ModuleRevision.findById(revision._id).populate('pn_id')

  const response_data = { revision }

  return successResponse(res, response_data, 'Revision has been updated.', success)
})

//@route    DELETE /api/pn/_id
//@desc     Delete an existed revision of part number by revision _id
//@access   Public
exports.delete = tryCatchAsync(async (req, res) => {
  const { _id } = req.params

  const revision = await ModuleRevision.findByIdAndDelete(_id)

  const response_data = { revision }

  return successResponse(res, response_data, 'Revision has been deleted.', success)
})

