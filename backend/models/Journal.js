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
    sentiment: {
      type: String
    },
    summary: {
      type: String
    },
    copingTips: {
      type: [String]
    },
    encouragement: {
      type: String
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Journal', journalSchema);

