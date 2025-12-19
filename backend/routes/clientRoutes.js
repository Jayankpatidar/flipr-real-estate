const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /api/clients - Add new client
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, review } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    // Validate required fields
    if (!name || !review) {
      return res.status(400).json({ message: 'Name and review are required' });
    }

    const newClient = new Client({
      name,
      review,
      image
    });

    await newClient.save();
    res.status(201).json({ message: 'Client added successfully', client: newClient });
  } catch (error) {
    console.error('Error saving client:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/clients - Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/clients/:id - Delete a client
router.delete('/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
