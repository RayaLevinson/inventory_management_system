const router = require('express').Router()
const typeOfMaterialController = require('@controllers/materials/parts/type_of_material.controller')
const commonValidation = require('@validations/common/common.validation')

// Material Types routes

//@route    GET /api/materials/types
//@desc     Get all materials types
//@access   Public
router.get('/', typeOfMaterialController.getAll)

//@route    POST /api/materials/types
//@desc     Add a new material type
//@access   Public
router.post('/', commonValidation.create, typeOfMaterialController.create)

//@route    PUT /api/materials/types/id
//@desc     Update an existed material type
//@access   Public
router.put('/:_id', commonValidation.update, typeOfMaterialController.update)

//@route    DELETE /api/materials/types/all
//@desc     Delete all materials
//@access   Public
router.delete('/all', typeOfMaterialController.deleteAll)

//@route    DELETE /api/materials/types/id
//@desc     Delete an existed material type
//@access   Public
router.delete('/:_id', commonValidation.delete, typeOfMaterialController.delete)

module.exports = router
