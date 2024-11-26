const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new mongoose.Schema({
  prId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  uId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  cStatus: {
    type: String,
    required: true
  },
  cQuantity: {
    type: Number,
    required: true,
  },
  cPrice: {
    type: Number,
    required: true,
  },
  COrderTime: {
    type: Date,
    default: Date.now,
  },
  cOrdered: {
    type: Boolean,
    default: false,
  },
  cPayment: {
    type: String,
    enum: ["PAYPAL", "COD"],
    default: "COD",
  },
}, {
  timestamps: true,
  strictPopulate: false,
})

module.exports = mongoose.model('Cart', cartSchema)