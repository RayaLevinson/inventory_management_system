const router = require('express').Router()
const pnController = require('@controllers/part_numbers/part_number.controller')
const commonValidation = require('@validations/common/common.validation')

// Part Number routes

//@route    POST /api/part_numbers
//@desc     Add a new part number
//@access   Public
router.post('/', commonValidation.create, pnController.create)

//@route    GET /api/part_numbers
//@desc     Get all part numbers
//@access   Public
router.get('/', pnController.getAll)

//@route    PUT /api/part_numbers/_id
//@desc     Update an existed part number
//@access   Public
router.put('/:_id', commonValidation.update, pnController.update)

//@route    DELETE /api/part_numbers/_id
//@desc     Delete a part number
//@access   Public
router.delete('/:_id', commonValidation.delete, pnController.delete)

module.exports = router
