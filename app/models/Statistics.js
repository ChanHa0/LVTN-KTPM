const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
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