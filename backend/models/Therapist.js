const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  specialty: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  distanceInfo: {
    type: String // E.g., '0.8 miles away'
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  coordinates: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Therapist', therapistSchema);
