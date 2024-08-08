const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    location: {type: String, required: true},
    skillOffered: { type: String, required: true },
    skillWanted: { type: String, required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    description: { type: String, required: true },
    dateTimePosted: { type: Date, default: Date.now }
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
