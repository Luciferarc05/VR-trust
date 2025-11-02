    const VideoLecture = require('../../models/resources/videoLecture');

    exports.getAllVideoLectures = async (req, res) => {
        try {
            const videos = await VideoLecture.find().sort({ createdAt: -1 });
            res.json(videos);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch videos: " + error.message });
        }
    };
    
    exports.createVideoLecture = async (req, res) => {
        const { title, videoUrl } = req.body;
        if (!title || !videoUrl) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newVideo = new VideoLecture(req.body);
        try {
            const savedVideo = await newVideo.save();
            res.status(201).json(savedVideo);
        } catch (error) {
            res.status(400).json({ message: "Failed to create video: " + error.message });
        }
    };
    
    exports.updateVideoLecture = async (req, res) => {
        try {
            const updatedVideo = await VideoLecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedVideo) return res.status(404).json({ message: "Video not found" });
            res.json(updatedVideo);
        } catch (error) {
            res.status(400).json({ message: "Failed to update video: " + error.message });
        }
    };
    
    exports.deleteVideoLecture = async (req, res) => {
        try {
            const deletedVideo = await VideoLecture.findByIdAndDelete(req.params.id);
            if (!deletedVideo) return res.status(404).json({ message: "Video not found" });
            res.json({ message: "Video deleted" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete video: " + error.message });
        }
    };
    

