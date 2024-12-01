const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema({
    prId: {
        type: Schema.Types.ObjectId,
        ref: "Product",

    },
    oId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    odQuantity: {
        type: String,

    },
    odPrice: {
        type: String,

    }
}, { timestamps: true });

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
