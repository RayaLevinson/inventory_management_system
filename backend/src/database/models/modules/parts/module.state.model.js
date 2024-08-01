const mongoose = require("mongoose");

// Module State Schema
const moduleStateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },

  { timestamps: true }
);

const ModuleState = mongoose.model("ModuleState", moduleStateSchema);
module.exports = ModuleState;
