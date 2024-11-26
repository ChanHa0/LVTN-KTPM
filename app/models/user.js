const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uName: {
    type: String,
    required: true,
  },
  uPassword: {
    type: String,
  },
  uEmail: {
    type: String,
    required: true,
    unique: true,
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
    enum: ['USER', 'ADMIN']
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
