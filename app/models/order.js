const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new mongoose.Schema({
  uId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  oOrderDate: {
    type: Date,
    default: Date.now,
  },
  oStatus: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    default: "PENDING",
  },
  oTotalAmount: {
    type: String,
    required: true,
  },
  oShippingAddress: {
    type: String,
    required: true,
  },
  oShippingMethod: {
    type: String,
    required: true,
  }
}, { timestamps: true, strictPopulate: false, })

module.exports = mongoose.model('Order', orderSchema)