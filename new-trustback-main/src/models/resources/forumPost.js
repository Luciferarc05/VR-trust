    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    const commentSchema = new Schema({
        authorName: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'Admin' },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    });
    
    const forumPostSchema = new Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorName: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'Admin' }, // From your auth model
        tags: [{ type: String }],
        comments: [commentSchema],
        createdAt: { type: Date, default: Date.now },
    });
    
    module.exports = mongoose.model('ForumPost', forumPostSchema);
    
