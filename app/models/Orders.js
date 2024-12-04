const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new mongoose.Schema({
  uId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  oItems: [
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
}, { timestamps: true, strictPopulate: false })

module.exports = mongoose.model('Order', orderSchema)