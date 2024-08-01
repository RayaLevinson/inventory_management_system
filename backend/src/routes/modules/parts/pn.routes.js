const router = require('express').Router()
const pnController = require('@controllers/modules/parts/pn.controller')
const commonValidation = require('@validations/common.validation')

// PN - Module Part Number routes

//@route    GET /api/pn
//@desc     Get all part numbers
//@access   Public
router.get('/', pnController.getAll)

//@route    POST /api/pn
//@desc     Add a new part number
//@access   Public
router.post('/', commonValidation.create, pnController.create)

//@route    PUT /api/pn/_id
//@desc     Update an existed part number
//@access   Public
router.put('/:_id', commonValidation.update, pnController.update)

//@route    DELETE /api/pn/_id
//@desc     Delete a part number
//@access   Public
router.delete('/:_id', commonValidation.delete, pnController.delete)

module.exports = router
