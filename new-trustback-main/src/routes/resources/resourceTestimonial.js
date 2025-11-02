const express = require('express');
const router = express.Router();
// Renamed controller import
const testimonialController = require('../../controllers/resources/testimonialController');
const { protect, admin } = require('../../middleware/auth'); // Auth middleware

// GET /api/resources/testimonials - Get all resource testimonials (public, optional filter ?resourceType=ebook)
router.get('/testimonials', testimonialController.getAllResourceTestimonials);

// POST /api/resources/testimonials - Create a new resource testimonial (Admin only)
router.post('/testimonials', protect, admin, testimonialController.createResourceTestimonial);

// PUT /api/resources/testimonials/:id - Update a testimonial (Admin only)
router.put('/testimonials/:id', protect, admin, testimonialController.updateResourceTestimonial);

// DELETE /api/resources/testimonials/:id - Delete a testimonial (Admin only)
router.delete('/testimonials/:id', protect, admin, testimonialController.deleteResourceTestimonial);

module.exports = router;
