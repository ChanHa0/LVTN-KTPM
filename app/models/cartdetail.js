const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartDetailSchema = new mongoose.Schema({
    cId: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
    },
    prId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    cdQuantity: {
        type: String,
        required: true,
    },
    cdTotalPrice: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('CartDetail', cartDetailSchema)