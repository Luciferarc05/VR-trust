// Note: Renamed to avoid conflict if you have another testimonial controller
const ResourceTestimonial = require('../../models/resources/resourceTestimonial');

// Get all resource testimonials, optionally filter by resource type
exports.getAllResourceTestimonials = async (req, res) => {
    try {
        const filter = req.query.resourceType ? { resourceType: req.query.resourceType } : {};
        const testimonials = await ResourceTestimonial.find(filter).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        console.error("Error fetching resource testimonials:", error);
        res.status(500).json({ message: "Failed to fetch testimonials. " + error.message });
    }
};

// Create a new resource testimonial (Admin might add these, or maybe users submit?)
// For now, assume Admin only
exports.createResourceTestimonial = async (req, res) => {
    const { quote, authorName, role, imageUrl, resourceType, resourceId } = req.body;

    if (!quote || !authorName) {
        return res.status(400).json({ message: 'Missing required fields: quote, authorName' });
    }

    const newTestimonial = new ResourceTestimonial({
        quote,
        authorName,
        role,
        imageUrl,
        resourceType,
        resourceId,
    });

    try {
        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (error) {
        console.error("Error creating resource testimonial:", error);
        res.status(400).json({ message: "Failed to create testimonial. " + error.message });
    }
};

// Update a resource testimonial (Admin only)
exports.updateResourceTestimonial = async (req, res) => {
     try {
        const updatedTestimonial = await ResourceTestimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json(updatedTestimonial);
    } catch (error) {
        console.error("Error updating resource testimonial:", error);
        res.status(400).json({ message: "Failed to update testimonial. " + error.message });
    }
};

// Delete a resource testimonial (Admin only)
exports.deleteResourceTestimonial = async (req, res) => {
     try {
        const deletedTestimonial = await ResourceTestimonial.findByIdAndDelete(req.params.id);
        if (!deletedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error("Error deleting resource testimonial:", error);
        res.status(500).json({ message: "Failed to delete testimonial. " + error.message });
    }
};
