const mongoose = require("mongoose");

// Module State Schema
const moduleStateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add Module State name'],
      minlength: [2, 'State should be at least 2 characters'],
      maxlength: [30, 'State cannot be more than 30 characters'],
      enum: ['Released', 'Development'],
      default: 'Released'
    }
  },

  { timestamps: true }
)

const ModuleState = mongoose.model("Module_State", moduleStateSchema);
module.exports = ModuleState;
