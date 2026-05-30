// backend/models/Pin.js
const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true, // We will use Cloudinary to get this URL later
  },
  // We will link this to a specific User later, but let's keep it simple for now
}, { timestamps: true }); // Automatically adds createdAt and updatedAt dates

module.exports = mongoose.model('Pin', pinSchema);