    const express = require('express');
    const router = express.Router();
    const workshopController = require('../../controllers/resources/workshopController');
    const { protect, admin } = require('../../middleware/auth');

    router.get('/workshops', workshopController.getAllWorkshops);
    router.post('/workshops', protect, admin, workshopController.createWorkshop);
    router.put('/workshops/:id', protect, admin, workshopController.updateWorkshop);
    router.delete('/workshops/:id', protect, admin, workshopController.deleteWorkshop);
    
    module.exports = router;
    

