const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema({
    prId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    oId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    odQuantity: {
        type: Number,
        required: true,
    },
    odPrice: {
        type: Number,
        required: true,
    },
    odSubTotal: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
