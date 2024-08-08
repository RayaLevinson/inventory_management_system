const router = require('express').Router()
const revisionOfPartNumberController = require('@controllers/part_numbers/parts/revision_of_part_number.controller')
const revisionValidation = require('@validations/part_numbers/parts/revision_of_part_number.validation')
const commonValidation = require('@validations/common/common.validation')

// Module Revisions per Part Number routes

//@route    GET /api/part_numbers/revisions
//@desc     Get all revisions of part number
//@access   Public
router.get('/', revisionOfPartNumberController.getAll)

//@route    POST /api/part_numbers/revisions
//@desc     Add a new revision of part number
//@access   Public
router.post('/', revisionValidation.create, revisionOfPartNumberController.create)

//@route    PUT /api/part_numbers/revisions/_id
//@desc     Update an existed revision
//@access   Public
router.put('/:_id', revisionOfPartNumberController.update)

//@route    DELETE /api/part_numbers/revisions/_id
//@desc     Delete a revision
//@access   Public
router.delete('/:_id', commonValidation.delete, revisionOfPartNumberController.delete)

module.exports = router
