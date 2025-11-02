    const express = require('express');
    const router = express.Router();
    const videoLectureController = require('../../controllers/resources/videoLectureController');
    const { protect, admin } = require('../../middleware/auth');

    router.get('/videos', videoLectureController.getAllVideoLectures);
    router.post('/videos', protect, admin, videoLectureController.createVideoLecture);
    router.put('/videos/:id', protect, admin, videoLectureController.updateVideoLecture);
    router.delete('/videos/:id', protect, admin, videoLectureController.deleteVideoLecture);
    
    module.exports = router;
    

