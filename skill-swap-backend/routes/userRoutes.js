const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');

// Middleware to authenticate and set user info
router.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
        req.userId = decoded.userId;
        next();
    });
});

router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Assuming you want to combine firstName and lastName into a single name for the front-end
        const { firstName, lastName, ...rest } = user.toObject();
        const name = `${firstName} ${lastName}`;
        res.json({ ...rest, name });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/updateProfile', async (req, res) => {
    const { username, firstName, lastName, userskills, linkedinUrl, xUrl, personalWebsiteUrl } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username ? username : user.username;
        user.firstName = firstName ? firstName : user.firstName;
        user.lastName = lastName ? lastName : user.lastName;
        user.userskills = userskills ? userskills : user.userskills;
        user.linkedinUrl = linkedinUrl ? linkedinUrl : user.linkedinUrl;
        user.xUrl = xUrl ? xUrl : user.xUrl;
        user.personalWebsiteUrl = personalWebsiteUrl ? personalWebsiteUrl : user.personalWebsiteUrl;

        await user.save();
        res.json({ user: user.toObject({ getters: true }), message: 'Profile successfully updated' });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find({}).select('username email userskills linkedinUrl xUrl personalWebsiteUrl -_id');
        res.json(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
