const mongoose = require('mongoose');
const { Schema } = mongoose;

const Snippet = new Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Snippet', Snippet);
