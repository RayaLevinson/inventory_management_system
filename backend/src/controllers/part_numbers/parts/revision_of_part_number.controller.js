const RevisionsOfPartNumber = require('@database/models/part_numbers/parts/revision_of_part_number.model')
const { successResponse } = require('@utils/apiResponse.util')
const tryCatchAsync = require('@utils/tryCatchAsync.util')
const { success, notFound } = require('@utils/statusCode.util').statusCode
const AppError = require('@utils/appError.util')

// Revision of Part Number Controller

//@route    GET /api/part_numbers/revisions
//@desc     Get all revisions of part number
//@access   Public
exports.getAll = tryCatchAsync(async (req, res) => {
  const revisions = await RevisionsOfPartNumber.find().populate('part_number_id')

  const response_data = { revisions }

  return successResponse(res, response_data, '', success)
})

//@route    POST /api/part_number/revisions
//@desc     Add a new revision of part number
//@access   Public
exports.create = tryCatchAsync(async (req, res) => {
  const { name, part_number_id } = req.body

  let revision = await RevisionsOfPartNumber.create({ name, part_number_id })

  revision = await RevisionsOfPartNumber.findById(revision._id).populate('part_number_id')

  const response_data = { revision }

  return successResponse(res, response_data, 'New Revision has been created.', success)
})

//@route    PUT /api/part_number/revisions/_id
//@desc     Update an existed revision of part number
//@access   Public
exports.update = tryCatchAsync(async (req, res, next) => {
  const _id = req.params.id

  const { name, part_number_id } = req.body

  let revision = await RevisionsOfPartNumber.findByIdAndUpdate(_id, { name, part_number_id })
  revision = await RevisionsOfPartNumber.findById(revision._id).populate('part_number_id')

  const response_data = { revision }

  return successResponse(res, response_data, 'Revision has been updated.', success)
})

//@route    DELETE /api/part_number/revision/_id
//@desc     Delete an existed revision of part number by revision _id
//@access   Public
exports.delete = tryCatchAsync(async (req, res) => {
  const { _id } = req.params

  const revision = await RevisionsOfPartNumber.findByIdAndDelete(_id)

  const response_data = { revision }

  return successResponse(res, response_data, 'Revision has been deleted.', success)
})
