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
    type: Number,
    required: false,
  },
  prPrice: {
    type: Number,
    required: false,
  }
}, { timestamps: true })

productSchema.index({ prTitle: 'text', prAuthor: 'text', prDescription: 'text' })
const Product = mongoose.model('Product', productSchema)

module.exports = Product