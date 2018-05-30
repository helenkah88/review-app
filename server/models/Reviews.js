let mongoose = require('mongoose');
let Schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  reviewImgs: [String],
  location: String
});

module.exports = mongoose.model('Review', Schema);