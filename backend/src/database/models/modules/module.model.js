const mongoose = require('mongoose')

// Module Schema
const moduleSchema = new mongoose.Schema(
  {
    description_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ModuleDescription'
    },
    pn_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ModulePartNumber'
    },
    revision_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ModuleRevision'
    },
    status_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ModuleStatus'
    },
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ModuleState'
    },
    module_serial_number: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ModuleSerialNumber'
    },
    firmware1: {
      type: String
    },
    firmware2: {
      type: String
    },
    firmware3: {
      type: String
    },
    quantity: {
      type: Number
    },
    date: {
      type: Date
    },
    comments: {
      type: String
    }
  },

  { timestamps: true }
)

const Module = mongoose.model('Module', moduleSchema)

module.exports = Module
