const router = require('express').Router()
const materialController = require('@controllers/materials/material.controller')
const commonValidation = require('@validations/common/common.validation')

// Material routes

//@route    GET /api/materials
//@desc     Get all materials
//@access   Public
router.get('/', materialController.getAll)

router.post('/filtered', materialController.getByFilter)

//@route    POST /api/materials
//@desc     Add a new material
//@access   Public
router.post('/', commonValidation.create, materialController.create)

//@route    PUT /api/materials/_id
//@desc     Update an existed material
//@access   Public
router.put('/:_id', commonValidation.update, materialController.update)

//@route    DELETE /api/materials/ll
//@desc     Delete all materials
//@access   Public
router.delete('/all', materialController.deleteAll)

//@route    DELETE /api/materials/_id
//@desc     Delete a material
//@access   Public
router.delete('/:_id', commonValidation.delete, materialController.delete)

module.exports = router
