    const Workshop = require('../../models/resources/workshop');

    // Get all workshops (public), can filter by ?status=upcoming or ?status=past
    exports.getAllWorkshops = async (req, res) => {
        try {
            let filter = {};
            if (req.query.status === 'upcoming') filter.isUpcoming = true;
            if (req.query.status === 'past') filter.isUpcoming = false;
            
            const workshops = await Workshop.find(filter).sort({ date: 1 });
            res.json(workshops);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch workshops: " + error.message });
        }
    };
    
    // Create new workshop (admin)
    exports.createWorkshop = async (req, res) => {
        const newWorkshop = new Workshop(req.body);
        try {
            const savedWorkshop = await newWorkshop.save();
            res.status(201).json(savedWorkshop);
        } catch (error) {
            res.status(400).json({ message: "Failed to create workshop: " + error.message });
        }
    };
    
    // Update workshop (admin)
    exports.updateWorkshop = async (req, res) => {
        try {
            const updatedWorkshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedWorkshop) return res.status(404).json({ message: "Workshop not found" });
            res.json(updatedWorkshop);
        } catch (error) {
            res.status(400).json({ message: "Failed to update workshop: " + error.message });
        }
    };
    
    // Delete workshop (admin)
    exports.deleteWorkshop = async (req, res) => {
        try {
            const deletedWorkshop = await Workshop.findByIdAndDelete(req.params.id);
            if (!deletedWorkshop) return res.status(404).json({ message: "Workshop not found" });
            res.json({ message: "Workshop deleted" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete workshop: " + error.message });
        }
    };
    

