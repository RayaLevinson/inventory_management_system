const router = require('express').Router()
const descriptionController = require('@controllers/modules/parts/description.controller')
const commonValidation = require('@validations/common.validation')

// Module Description routes

//@route    GET /api/descriptions
//@desc     Get all descriptions
//@access   Public
router.get('/', descriptionController.getAll)

//@route    POST /api/descriptions
//@desc     Add a new description
//@access   Public
router.post('/', commonValidation.create, descriptionController.create)

//@route    PUT /api/descriptions/_id
//@desc     Update an existed description
//@access   Public
router.put('/:_id', commonValidation.update, descriptionController.update)

//@route    DELETE /api/descriptions/_id
//@desc     Delete a description
//@access   Public
router.delete('/:_id', commonValidation.delete, descriptionController.delete)

module.exports = router
