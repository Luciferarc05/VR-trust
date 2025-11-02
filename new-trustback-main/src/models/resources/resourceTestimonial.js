const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceTestimonialSchema = new Schema({
    quote: {
        type: String,
        required: true,
        trim: true
    },
    authorName: {
        type: String,
        required: true,
        trim: true
    },
    role: { // e.g., "Student", "Mentee", "Workshop Attendee"
        type: String,
        required: false,
        trim: true
    },
    imageUrl: { // URL to author's photo (optional)
        type: String,
        required: false
    },
    resourceType: { // To link testimonial to a specific resource type
        type: String,
        enum: ['ebook', 'workshop', 'video', 'mentorship', 'forum', 'other'], // Allowed values
        required: false
    },
    // Optional: Link to a specific resource (e.g., the ID of the ebook or workshop)
    resourceId: {
       type: Schema.Types.ObjectId,
       required: false
       // You might add a 'refPath' if linking to different model types
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ResourceTestimonial = mongoose.model('ResourceTestimonial', resourceTestimonialSchema);

module.exports = ResourceTestimonial;
