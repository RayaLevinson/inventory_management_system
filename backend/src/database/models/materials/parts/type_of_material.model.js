const mongoose = require('mongoose')

// Type of Material Schema
const typeOfMaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add Type Name'],
      minlength: [2, 'Type Name should be at least 2 characters'],
      maxlength: [50, 'Type Name cannot be more than 50 characters']
    }
  },

  { timestamps: true }
)

const TypeOfMaterial = mongoose.model('Material_Type', typeOfMaterialSchema)

module.exports = TypeOfMaterial
