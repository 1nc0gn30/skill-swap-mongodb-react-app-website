const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); // Import helmet
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['https://yoururl.com', 'https://yourotherurl.com'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet()); // Use helmet for security
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
