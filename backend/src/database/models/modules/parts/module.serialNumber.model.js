const mongoose = require("mongoose");

// Module Serial Number Schema
const moduleSerialNumberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },

  { timestamps: true }
);

const ModuleSerialNumber = mongoose.model('ModuleSerialNumber', moduleSerialNumberSchema)

module.exports = ModuleSerialNumber
