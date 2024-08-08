const { successResponse } = require('@utils/apiResponse.util')
const Material = require('@database/models/materials/material.model')
const PartNumber = require('@database/models/part_numbers/part_number.model')
const RevisionsOfPartNumber = require('@database/models/part_numbers/parts/revision_of_part_number.model')
const tryCatchAsync = require('@utils/tryCatchAsync.util')
const { success, notFound } = require('@utils/statusCode.util').statusCode
const AppError = require('@utils/appError.util')

// Material Controller

//@route    POST /api/materials
//@desc     Add a new module material
//@access   Public
exports.create = tryCatchAsync(async (req, res) => {
  const payload = req.body
  const { part_number_name, revision_name, quantity } = payload

  // Create a new part number if part_number_name is provided
  if (part_number_name) {
    payload = await createNewPartNumber(part_number_name, payload)
  }

  // Create a new revision of part number if revision_name is provided
  if (revision_name) {
    payload = await createNewRevision(revision_name, payload)
  }

  // if (part_number_name) {
  //   payload.part_number_id = null
  //   const part_number = await PartNumber.create({ name: part_number_name, type_id: payload.type_id })
  //   payload.part_number_id = part_number._id
  //   console.log('#######createNewRevision', part_number_name, payload)
  // }

  // if (revision_name) {
  //   payload.revision_id = null
  //   const revision = await RevisionsOfPartNumber.create({ name: revision_name, part_number_id: payload.part_number_id })
  //   payload = payload.revision_id = revision._id
  // }

  // Set default quantity to 1
  payload.quantity = quantity || 1

  let material = await Material.create(payload)

  await PartNumber.findByIdAndUpdate(payload.part_number_id, { material_id: material._id })

  material = await Material.findById(material._id)
    .populate('type_id')
    .populate('part_number_id')
    .populate('revision_id')

  const response_data = { material }
  return successResponse(res, response_data, 'New Material has been created.', success)
})

//@route    GET /api/materials
//@desc     Get all module materials
//@access   Public
exports.getAll = tryCatchAsync(async (req, res) => {
  const materials = await Material.find()
    // Fill the fields of type_id, part_number_id, revision
    .populate('type_id')
    .populate('part_number_id')
  // .populate('revision_id')

  const response_data = { materials }

  return successResponse(res, response_data, '', success)
})

exports.getByFilter = tryCatchAsync(async (req, res) => {
  const { page, page_size, ...rest } = req.body
  const query = { ...rest }

  const skip = (page - 1) * page_size
  let materials = await Material.find(query)
    .skip(skip)
    .limit(page_size)
    .sort({ createdAt: -1 })
    .populate('type_id')
    .populate('part_number_id')
    .populate('revision_id')
    .exec()

  let count = await Material.countDocuments(query)

  let response_data = { materials, count }

  return successResponse(res, response_data, '', success)
})

//@route    PUT /api/materials/_id
//@desc     Update an existed module material
//@access   Public
exports.update = tryCatchAsync(async (req, res, next) => {
  const { _id } = req.params
  const payload = req.body

  let material = await Material.findByIdAndUpdate(_id, payload)

  if (!material) {
    return next(new AppError('Material not found.', notFound))
  }

  material = await Material.findById(_id).populate('type_id').populate('part_number_id').populate('revision_id')

  let response_data = { material }

  return successResponse(res, response_data, 'Material has been updated.', success)
})

//@route    DELETE /api/materials/_id
//@desc     Delete an existed material
//@access   Public
exports.delete = tryCatchAsync(async (req, res) => {
  const { _id } = req.params

  const material = await Material.findByIdAndDelete(_id)

  const response_data = { material }

  return successResponse(res, response_data, 'Material has been deleted.', success)
})

//@route    DELETE /api/materials/all
//@desc     Delete all materials
//@access   Public
exports.deleteAll = async (req, res) => {
  const result = await Material.deleteMany({})

  // Number of documents deleted
  let deletedCount = result.deletedCount
  deletedCount = deletedCount || 0

  const response_data = { deletedCount }

  return successResponse(res, response_data, `All ${deletedCount} Materials were deleted.`, success)
}

const createNewPartNumber = async (part_number_name, payload) => {
  payload.part_number_id = null
  const part_number = await PartNumber.create({ name: part_number_name, type_id: payload.type_id })
  payload.part_number_id = part_number._id
  console.log('#######createNewRevision', part_number_name, payload)
  return payload
}

const createNewRevision = async (revision_name, payload) => {
  payload.revision_id = null
  const revision = await RevisionsOfPartNumber.create({ name: revision_name, part_number_id: payload.part_number_id })
  payload = payload.revision_id = revision._id
  return payload
}
