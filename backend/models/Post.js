const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Required for Reddit-style pseudonymity    
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Depression', 'Loneliness', 'Seeking Hope', 'Mindfulness', 'General'],
    default: 'General'
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'  //require fot the user based like one user cannot like multiple times
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
