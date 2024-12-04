const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticSchema = new mongoose.Schema({
    oId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    prId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    sDate: {
        type: Date,
        required: true,
    },
    sTotalRevenue: {
        type: Number,
        required: true,
    },
    sTotalOrder: {
        type: Number,
        required: true,
    },
    sTotalProductSold: {
        type: Number,
        required: true,
    },
    sProductInventory: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('Statistic', statisticSchema)