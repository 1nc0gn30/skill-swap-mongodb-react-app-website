// routes/authRoutes.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', [
  body('email', 'Invalid email address').isEmail(),
  body('username', 'Username is required').not().isEmpty(),
  body('firstName', 'First name is required').not().isEmpty(),
  body('lastName', 'Last name is required').not().isEmpty(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, username, firstName, lastName, password } = req.body;

    console.log('Received password:', password); // Log the received password

    // Trim any whitespace characters
    const trimmedPassword = password.trim();

    console.log('Trimmed password:', trimmedPassword); // Log the trimmed password

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    console.log('Hashed password:', hashedPassword); // Log the hashed password

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).send({ error: 'Email or username is already in use' });
    }

    const user = new User({
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword
    });

    await user.save();
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Server error during registration' });
  }
});



// Login route
router.post('/login', [
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: 'Login failed: Check authentication credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Server error during login' });
  }
});

module.exports = router;
