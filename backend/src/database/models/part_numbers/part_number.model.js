const mongoose = require("mongoose");

// Part Number Schema
const partNumberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add Part Number name'],
      minlength: [2, 'Part Number should be at least 2 characters'],
      maxlength: [30, 'Part Number cannot be more than 30 characters']
    },
    type_id: {
      // Material Type ID
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material_Type',
      required: [true, 'Please add Type ID of Material']
    },
    material_id: {
      // Material ID
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
    }
  },
  { timestamps: true }
)

const PartNumber = mongoose.model('Part_Number', partNumberSchema)

module.exports = PartNumber
