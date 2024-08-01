const mongoose = require("mongoose");

// Module Part Number Schema
const modulePartNumberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },

  { timestamps: true }
);

const ModulePartNumber = mongoose.model(  "ModulePartNumber", modulePartNumberSchema);

module.exports = ModulePartNumber;
