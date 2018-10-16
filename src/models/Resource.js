const mongoose = require('mongoose');
const { Schema } = mongoose;

const Resource = new Schema({
    title: String,
    description: String
    img:
      { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Resource', Resource);
