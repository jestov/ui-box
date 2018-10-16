const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true
      }
});

module.exports = mongoose.model('User', User);
