const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new mongoose.Schema({
  uId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  COrderTime: {
    type: Date,
    default: Date.now,
  },
  cStatus: {
    type: String,
    required: true
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