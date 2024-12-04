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
  prCategory: {
    type: String,
    enum: ['Sách văn học', 'Sách khoa học', 'Sách kinh tế', 'Tiểu thuyết', 'Truyện tranh', 'Sách ngoại ngữ', 'Sách thiếu nhi'],
    required: true,
  },
  prDescription: {
    type: String,
    required: true,
  },
  prStockQuantity: {
    type: Number,
    required: true,
  },
  prPrice: {
    type: Number,
    required: true,
  },
  prRating: {
    type: Number,
    min: 1,
    max: 5,
  },
  prComment: {
    type: String,
    maxLength: 255,
  }
}, { timestamps: true })

productSchema.index({ prTitle: 'text', prAuthor: 'text', prDescription: 'text' })

module.exports = mongoose.model('Product', productSchema)
