const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new mongoose.Schema({
  uId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  cItems: [
    {
      prId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      prQuantity: {
        type: Number,
        required: true,
        default: 1,
      },
      prPrice: {
        type: Number,
        required: true,
      },
    }
  ],
  cTotalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
  strictPopulate: false,
})

module.exports = mongoose.model('Cart', cartSchema)