const mongoose = require('mongoose')

// Material Schema
const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add Material Name'],
      minlength: [2, 'Material should be at least 2 characters'],
      maxlength: [50, 'Material cannot be more than 50 characters']
    },
    type_id: {
      // Material Type ID
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material_Type',
      required: [true, 'Please add Type ID of Material']
    },
    quantity: {
      type: Number,
      default: 1
    },
    part_number_id: {
      // Part Number ID
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Part_Number'
    },
    revision_id: {
      // Revision ID
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Part_Numbers_Revision'
    }
  },

  { timestamps: true }
)

const Material = mongoose.model('Material', materialSchema)

module.exports = Material
