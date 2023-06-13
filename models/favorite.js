const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'property',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
});

const Favorite = mongoose.model('favorite', favoriteSchema);
module.exports = Favorite;