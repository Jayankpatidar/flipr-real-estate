const express = require('express');
const router = express.Router();
const Subscribe = require('../models/Subscribe');

// POST /api/subscribe - Subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const newSubscriber = new Subscribe({
      email
    });

    await newSubscriber.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/subscribe - Get all subscribers (for admin panel)
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscribe.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/subscribe/:id - Delete a subscriber
router.delete('/:id', async (req, res) => {
  try {
    await Subscribe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
