const mongoose = require('mongoose');
const { Schema } = mongoose;

const Folder = new Schema({
    title: String,
});

module.exports = mongoose.model('Folder', Folder);
