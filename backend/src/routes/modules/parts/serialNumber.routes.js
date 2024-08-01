const router = require("express").Router();
const serialNumberController = require("@controllers/modules/parts/serialNumber.controller");
const commonValidation = require("@validations/common.validation");

// Module Serial Number routes

//@route    GET /api/module_serial_numbers
//@desc     Get all serial numbers of module
//@access   Public
router.get("/", serialNumberController.getAll);

//@route    POST /api/module_serial_numbers
//@desc     Add a new serial number of module
//@access   Public
router.post("/", commonValidation.create, serialNumberController.create);

//@route    PUT /api/module_serial_numbers/_id
//@desc     Update an serial number
//@access   Public
router.put('/:_id', commonValidation.update, serialNumberController.update)

//@route    DELETE /api/module_serial_numbers/_id
//@desc     Delete a serial number
//@access   Public
router.delete("/:_id", commonValidation.delete, serialNumberController.delete);

module.exports = router;
