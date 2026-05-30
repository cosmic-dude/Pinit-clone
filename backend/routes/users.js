// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Save a pin to a user's account
router.put('/:id/save', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    // Check if the user's schema has the savedPins array, if not, create it
    if (!user.savedPins) {
      user.savedPins = [];
    }

    // Check if the pin is already saved to prevent duplicates
    if (!user.savedPins.includes(req.body.pinId)) {
      await user.updateOne({ $push: { savedPins: req.body.pinId } });
      res.status(200).json("Pin has been saved successfully!");
    } else {
      res.status(403).json("You already saved this pin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;