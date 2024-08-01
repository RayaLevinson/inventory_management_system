const mongoose = require("mongoose");

// Module Description Schema
const moduleDescriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },

  { timestamps: true }
);

const ModuleDescription = mongoose.model(
  "ModuleDescription",
  moduleDescriptionSchema
);

module.exports = ModuleDescription;
