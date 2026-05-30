// backend/routes/pins.js
const express = require('express');
const router = express.Router();
const Pin = require('../models/Pin');

// Create a new pin
router.post('/', async (req, res) => {
  try {
    const newPin = new Pin(req.body);
    const savedPin = await newPin.save();
    res.status(201).json(savedPin);
  } catch (err) {
    res.status(500).json({ message: "Failed to create pin", error: err.message });
  }
});

// Get all pins
router.get('/', async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;