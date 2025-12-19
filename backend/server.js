const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Routes IMPORT (IMPORTANT)
// ======================
const projectRoutes = require('./routes/projectRoutes');
const clientRoutes = require('./routes/clientRoutes');
const contactRoutes = require('./routes/contactRoutes');
const subscribeRoutes = require('./routes/subscribeRoutes');

// ======================
// Routes USE
// ======================
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscribe', subscribeRoutes);

// ======================
// Static uploads folder
// ======================
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ======================
// MongoDB Connection
// ======================
mongoose
  .connect('mongodb://localhost:27017/flipr_real_estate')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// ======================
// Frontend static files
// ======================
app.use(express.static(path.join(__dirname, '../frontend')));

// ======================
// React / Frontend fallback
// ======================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ======================
// Server start
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
