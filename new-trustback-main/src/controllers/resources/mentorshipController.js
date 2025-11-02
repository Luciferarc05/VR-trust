    const Mentor = require('../../models/resources/mentor');

    // Get all mentors (public)
    exports.getAllMentors = async (req, res) => {
        try {
            const mentors = await Mentor.find();
            res.json(mentors);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch mentors: " + error.message });
        }
    };
    
    // Create new mentor (admin)
    exports.createMentor = async (req, res) => {
        const newMentor = new Mentor(req.body);
        try {
            const savedMentor = await newMentor.save();
            res.status(201).json(savedMentor);
        } catch (error) {
            res.status(400).json({ message: "Failed to create mentor: " + error.message });
        }
    };
    
    // Update mentor (admin)
    exports.updateMentor = async (req, res) => {
        try {
            const updatedMentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedMentor) return res.status(404).json({ message: "Mentor not found" });
            res.json(updatedMentor);
        } catch (error) {
            res.status(400).json({ message: "Failed to update mentor: " + error.message });
        }
    };
    
    // Delete mentor (admin)
    exports.deleteMentor = async (req, res) => {
        try {
            const deletedMentor = await Mentor.findByIdAndDelete(req.params.id);
            if (!deletedMentor) return res.status(404).json({ message: "Mentor not found" });
            res.json({ message: "Mentor deleted" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete mentor: " + error.message });
        }
    };
    

