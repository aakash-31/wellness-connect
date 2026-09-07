const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    enum: ['Happy', 'Sad', 'Anxious', 'Calm', 'Reflective', 'Neutral'],
    default: 'Neutral'
  },
  aiAnalysis: {
    type: {
      sentiment: String,
      summary: String,
      copingTips: [String],
      encouragement: String
    },
    default: null,
    _id: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Journal', journalSchema);

