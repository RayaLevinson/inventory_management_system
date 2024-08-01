const mongoose = require("mongoose");

// Revision of Part Number of a Module Schema
const moduleRevisionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    pn_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ModulePartNumber",
    },
  },

  { timestamps: true }
);

const ModuleRevision = mongoose.model("ModuleRevision", moduleRevisionSchema);

module.exports = ModuleRevision;
