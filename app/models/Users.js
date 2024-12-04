const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uName: {
    type: String,
    required: true,
  },
  uPassword: {
    type: String,
    required: true,
  },
  uEmail: {
    type: String,
    unique: true,
    required: true,
  },
  uAddress: {
    type: String,
  },
  uPhone: {
    type: String,
  },
  uRole: {
    type: String,
    default: 'USER',
    enum: ['USER', 'ADMIN'],
    required: true,
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
