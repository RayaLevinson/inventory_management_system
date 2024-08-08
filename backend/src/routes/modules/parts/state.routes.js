const router = require('express').Router()
const stateController = require('@controllers/modules/parts/state.controller')
const commonValidation = require('@validations/common/common.validation')

// Module State routes

//@route    GET /api/modules/states
//@desc     Get all states
//@access   Public
router.get('/', stateController.getAll)

//@route    POST /api/modules/states
//@desc     Add a new state of the module
//@access   Public
router.post('/', commonValidation.create, stateController.create)

//@route    PUT /api/modules/states/_id
//@desc     Update an existed state
//@access   Public
router.put('/:_id', commonValidation.update, stateController.update)

//@route    DELETE /api/modules/states/_id
//@desc     Delete a state
//@access   Public
router.delete('/:_id', commonValidation.delete, stateController.delete)

module.exports = router
