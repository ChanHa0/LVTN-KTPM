const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  prTitle: {
    type: String,
    required: true,
  },
  prAuthor: {
    type: String,
    required: true,
  },
  prImage: {
    type: String,
    required: true,
  },
  prDescription: {
    type: String,
    required: true,
  },
  prCategory: {
    type: String,
    required: true,
  },
  prStockQuantity: {
    type: String,
    required: true,
  },
  prPrice: {
    type: String,
    required: true,
  }
}, { timestamps: true })

productSchema.index({ prTitle: 'text', prAuthor: 'text', prDescription: 'text' })

module.exports = mongoose.model('Product', productSchema)
