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
  sId: {
    type: Schema.Types.ObjectId,
    ref: "Statistic",
    required: true,
  },
  oTotalPrice: {
    type: Number,
    required: true,
  },
  oStatus: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    default: "PENDING",
    required: true,
  },
  oShippingAddress: {
    type: String,
    required: true,
  },
  oShippingMethod: {
    type: String,
    enum: ["Giao hàng tiêu chuẩn", "Giao hàng nhanh"],
    required: true,
  },
  oPaymentMethod: {
    type: String,
    enum: ["PAYPAL", "COD"],
    default: "COD",
    required: true,
  },
  oPayment: {
    type: String,
    required: true,
  }
}, { timestamps: true, strictPopulate: false })

module.exports = mongoose.model('Order', orderSchema)