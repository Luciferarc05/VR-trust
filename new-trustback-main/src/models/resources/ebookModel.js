    const mongoose = require('mongoose');
    const ebookSchema = new mongoose.Schema({
      title: { type: String, required: true, trim: true },
      author: { type: String, required: true, trim: true },
      coverImage: { type: String, required: true },
      fileUrl: { type: String, required: true },
      description: { type: String, trim: true },
      createdAt: { type: Date, default: Date.now },
    });
    module.exports = mongoose.model('Ebook', ebookSchema);
    

