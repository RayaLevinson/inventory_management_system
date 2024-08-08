const mongoose = require('mongoose')

// Module Schema
const moduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add Module Name'],
      minlength: [2, 'Module Name should be at least 2 characters'],
      maxlength: [50, 'Module Name cannot be more than 50 characters']
    },
    material_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
      required: [true, 'Please add Material']
    },
    part_number_id: {
      // Part Number ID
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PartNumber',
      required: [true, 'Please add Part Number']
    },
    part_number_revision_id: {
      // Part Number Revision ID
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RevisionsOfPartNumber',
      required: [true, 'Please add Revision of Part Number']
    },
    module_serial_number: {
      type: String,
      trim: true
    },
    firmware1: {
      type: String,
      trim: true
    },
    firmware2: {
      type: String,
      trim: true
    },
    firmware3: {
      type: String,
      trim: true
    },
    module_status_id: {
      // Can be 'In Stock', 'On Shelf', 'Assembled', 'Obsolete'
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ModuleStatus',
      required: [true, 'Please add Module Status']
    },
    module_state_id: {
      // Can be 'Released', 'Development'
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ModuleState',
      required: [true, 'Please add Module State']
    },
    comments: {
      type: String,
      trim: true
    }
  },

  { timestamps: true }
)

const Module = mongoose.model('Module', moduleSchema)

module.exports = Module
