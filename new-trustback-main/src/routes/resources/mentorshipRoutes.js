    const express = require('express');
    const router = express.Router();
    const mentorshipController = require('../../controllers/resources/mentorshipController');
    const { protect, admin } = require('../../middleware/auth');

    // Public route
    router.get('/mentors', mentorshipController.getAllMentors);
    
    // Admin routes
    router.post('/mentors', protect, admin, mentorshipController.createMentor);
    router.put('/mentors/:id', protect, admin, mentorshipController.updateMentor);
    router.delete('/mentors/:id', protect, admin, mentorshipController.deleteMentor);
    
    module.exports = router;
    

