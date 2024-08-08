const mongoose = require("mongoose");

// Module Status Schema
const moduleStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add Module Status name'],
      minlength: [2, 'Status should be at least 2 characters'],
      maxlength: [30, 'Status cannot be more than 30 characters'],
      enum: ['On_Shelf, Assembled, Obsolete'],
      default: 'On_Shelf'
    }
  },

  { timestamps: true }
)

const ModuleStatus = mongoose.model("Module_Status", moduleStatusSchema);
module.exports = ModuleStatus;
