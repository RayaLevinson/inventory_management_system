const mongoose = require("mongoose");

// Module Status Schema
const moduleStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },

  { timestamps: true }
);

const ModuleStatus = mongoose.model("ModuleStatus", moduleStatusSchema);
module.exports = ModuleStatus;
