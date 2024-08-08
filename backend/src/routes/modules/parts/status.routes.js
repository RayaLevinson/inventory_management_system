const router = require('express').Router()
const statusController = require('@controllers/modules/parts/status.controller')
const commonValidation = require('@validations/common/common.validation')

// Module Status routes

//@route    GET /api/modules/statuses
//@desc     Get all module statuses
//@access   Public
router.get('/', statusController.getAll)

//@route    POST /api/modules/statuses
//@desc     Add a new module status
//@access   Public
router.post('/', commonValidation.create, statusController.create)

//@route    PUT /api/modules/statuses/_id
//@desc     Update an existed module status
//@access   Public
router.put('/:_id', commonValidation.update, statusController.update)

//@route    DELETE /api/modules/statuses/_id
//@desc     Delete a status of module by status _id
//@access   Public
router.delete('/:_id', commonValidation.delete, statusController.delete)

module.exports = router
