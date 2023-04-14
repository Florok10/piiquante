const mongoose = require('mongoose');
const { Schema } = mongoose;

const sauceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainPepper: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  heat: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
    min: 0,
  },
  usersLiked: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  usersDisliked: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

module.exports = mongoose.model('Sauce', sauceSchema);
