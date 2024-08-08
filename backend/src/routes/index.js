const router = require("express").Router();
const material_routes = require('./materials/material.routes')
const type_of_material_routes = require('./materials/parts/type_of_material.routes')
const part_number_routes = require("./part_numbers/part_number.routes");
const part_number_revision_routes = require("./part_numbers/parts/revision_of_part_number.routes");
const module_routes = require("./modules/module.routes");
const module_state_routes = require("./modules/parts/state.routes");
const module_status_routes = require("./modules/parts/status.routes");

// Material Routes
router.use('/materials', material_routes) 
router.use('/materials/types', type_of_material_routes) 

// Part Number Routes
router.use('/part_numbers', part_number_routes)                     // Part Number routes
router.use('/part_numbers/revisions', part_number_revision_routes)                     // Part Number routes

// Modules Routes
router.use("/modules", module_routes);                // Module routes
router.use('/modules/statuses', module_status_routes) // Module Status routes
router.use('/modules/states', module_state_routes)    // Module State routes

const api_routes = router;

module.exports = api_routes;
