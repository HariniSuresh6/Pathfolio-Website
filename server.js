require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const milestonesRouter = require('./routes/milestones');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/milestones', milestonesRouter);

// Serve React build
app.use(express.static(path.join(__dirname, 'build')));

// React routing fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error', err));
