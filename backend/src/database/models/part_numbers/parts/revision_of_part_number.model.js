const mongoose = require("mongoose");

// Revision of Part Number Schema
const revisionsOfPartNumberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add a name of Revision of Part Number'],
      minlength: [2, 'Part Number Revision should be at least 2 characters'],
      maxlength: [30, 'Part Number Revision cannot be more than 30 characters']
    },
    part_number_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Part_Number',
      required: [true, 'Please add Part Number ID']
    }
  },

  { timestamps: true }
)

const RevisionsOfPartNumber = mongoose.model('Part_Numbers_Revision', revisionsOfPartNumberSchema)

module.exports = RevisionsOfPartNumber
