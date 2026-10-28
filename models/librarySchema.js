const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Library = mongoose.model('Library', LibrarySchema);

module.exports = Library;