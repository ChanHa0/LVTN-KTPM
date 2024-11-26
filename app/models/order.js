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
  oStatus: {
    type: Boolean,
    default: false,
  },
  oOrderdate: {
    type: Date,
    default: Date.now,
  },
  oTotalamount: {
    type: Number,
    required: true,
  },
  oShippingaddress: {
    type: String,
    required: true,
  },
  oShippingmethod: {
    type: String,
    required: true,
  }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)