const router = require("express").Router();
const description_routes = require("./modules/parts/description.routes");
const pn_routes = require("./modules/parts/pn.routes");
const revision_routes = require("./modules/parts/revision.routes");
const state_routes = require("./modules/parts/state.routes");
const status_routes = require("./modules/parts/status.routes");
const module_serial_number_routes = require("./modules/parts/serialNumber.routes");

const module_routes = require("./modules/module.routes");

//Modules Routes
router.use("/modules", module_routes);            // Module routes
router.use("/descriptions", description_routes);  // Module Description routes
router.use("/pn", pn_routes);                     // Module Part Number routes
router.use("/revisions", revision_routes);        // Module Revisions per Part Number routes
router.use("/statuses", status_routes);           // Module Status routes
router.use("/states", state_routes);              // Module State routes
router.use('/module_serial_numbers',              // Module Serial Number routes
            module_serial_number_routes)

const api_routes = router;

module.exports = api_routes;
