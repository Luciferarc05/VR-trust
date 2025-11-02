    const mongoose = require('mongoose');
    const videoLectureSchema = new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String },
        videoUrl: { type: String, required: true }, // e.g., YouTube link
        thumbnailUrl: { type: String },
        category: { type: String },
        createdAt: { type: Date, default: Date.now },
    });
    module.exports = mongoose.model('VideoLecture', videoLectureSchema);
    

