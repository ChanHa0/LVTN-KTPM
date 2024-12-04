const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new mongoose.Schema({
  uId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cdItems: [
    {
      prId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      cdQuantity: {
        type: Number,
        required: true,
      },
      cdPrice: {
        type: Number,
        required: true,
      },
    }
  ],
  cTotalPrice: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
  strictPopulate: false,
})

module.exports = mongoose.model('Cart', cartSchema)