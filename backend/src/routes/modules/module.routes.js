const router = require('express').Router()
const moduleController = require('@controllers/modules/module.controller')
const moduleValidation = require('@validations/modules/module.validation')
const commonValidation = require('@validations/common.validation')

// Module routes

//@route    GET /api/modules
//@desc     Get all modules based 
//@access   Public
router.get('/', moduleController.getAll)

//@route    POST /api/modules
//@desc     Add a new module
//@access   Public
router.post('/', moduleValidation.create, moduleController.create)

//@route    PUT /api/modules/_id
//@desc     Update an existed module
//@access   Public
router.put('/:_id', moduleController.update)

//@route    DELETE /api/modules/_id
//@desc     Delete a module
//@access   Public
router.delete('/:_id', commonValidation.delete, moduleController.delete)

module.exports = router
