    const express = require('express');
    const router = express.Router();
    const ebookController = require('../../controllers/resources/ebookController');
    const { protect, admin } = require('../../middleware/auth');

    // Public route to get all ebooks
    router.get('/ebooks', ebookController.getAllEbooks);
    
    // Admin routes
    router.post('/ebooks', protect, admin, ebookController.createEbook);
    router.put('/ebooks/:id', protect, admin, ebookController.updateEbook);
    router.delete('/ebooks/:id', protect, admin, ebookController.deleteEbook);
    
    module.exports = router;
    

