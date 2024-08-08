const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const authenticateToken = require('../middleware/authenticateToken'); // Import the centralized authentication middleware

router.post('/', authenticateToken, async (req, res) => { // Assume posting a skill requires authentication
    try {
        const { location, skillOffered, skillWanted, name, contact, description } = req.body;
        const newSkill = new Skill({
            location,
            skillOffered,
            skillWanted,
            name,
            contact,
            description,
            user: req.user.id // Assuming you want to save the user who posted the skill
        });
        await newSkill.save();
        res.status(201).send(newSkill);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find({});
        res.status(200).send(skills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).send(error);
    }
});

// Fetching skills for the logged-in user based on their username
router.get('/my/skills', authenticateToken, async (req, res) => {
    try {
        // Make sure the username is included in the JWT and accessible via req.user.username
        if (!req.user || !req.user.username) {
            return res.status(400).json({ message: 'User information not available' });
        }
        
        const skills = await Skill.find({ username: req.user.username });
        if (!skills.length) {
            return res.status(404).json({ message: 'No skills found for this user' });
        }
        res.json(skills);
    } catch (error) {
        console.error('Error fetching skills based on username:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
