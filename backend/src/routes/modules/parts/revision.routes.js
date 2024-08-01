const router = require('express').Router()
const revisionController = require('@controllers/modules/parts/revision.controller')
const revisionValidation = require('@validations/modules/parts/revision.validation')
const commonValidation = require('@validations/common.validation')

// Module Revisions per Part Number routes

//@route    GET /api/revisions
//@desc     Get all revisions
//@access   Public
router.get('/', revisionController.getAll)

//@route    POST /api/revisions
//@desc     Add a new revision
//@access   Public
router.post('/', revisionValidation.create, revisionController.create)

//@route    PUT /api/revisions/_id
//@desc     Update an existed revision
//@access   Public
router.put('/:_id', revisionController.update)

//@route    DELETE /api/pn/_id
//@desc     Delete a revision
//@access   Public
router.delete('/:_id', commonValidation.delete, revisionController.delete)

module.exports = router
