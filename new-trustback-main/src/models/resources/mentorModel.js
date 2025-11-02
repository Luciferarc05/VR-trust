    const mongoose = require('mongoose');
    const mentorSchema = new mongoose.Schema({
        name: { type: String, required: true },
        expertise: [{ type: String }],
        bio: { type: String, required: true },
        imageUrl: { type: String },
        isAvailable: { type: Boolean, default: true },
        contactInfo: { type: String },
        createdAt: { type: Date, default: Date.now },
    });
    module.exports = mongoose.model('Mentor', mentorSchema);
    

