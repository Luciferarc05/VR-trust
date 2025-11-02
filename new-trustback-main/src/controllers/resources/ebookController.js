    const Ebook = require('../../models/resources/ebook');

    // Get all ebooks
    exports.getAllEbooks = async (req, res) => {
      try {
        const ebooks = await Ebook.find().sort({ createdAt: -1 });
        res.json(ebooks);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch ebooks: " + error.message });
      }
    };
    
    // Create new ebook
    exports.createEbook = async (req, res) => {
      const { title, author, coverImage, fileUrl, description } = req.body;
      if (!title || !author || !coverImage || !fileUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const newEbook = new Ebook({ title, author, coverImage, fileUrl, description });
      try {
        const savedEbook = await newEbook.save();
        res.status(201).json(savedEbook);
      } catch (error) {
        res.status(400).json({ message: "Failed to create ebook: " + error.message });
      }
    };
    
    // Update an ebook
    exports.updateEbook = async (req, res) => {
        try {
            const updatedEbook = await Ebook.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedEbook) return res.status(404).json({ message: "Ebook not found" });
            res.json(updatedEbook);
        } catch (error) {
            res.status(400).json({ message: "Failed to update ebook: " + error.message });
        }
    };
    
    // Delete an ebook
    exports.deleteEbook = async (req, res) => {
        try {
            const deletedEbook = await Ebook.findByIdAndDelete(req.params.id);
            if (!deletedEbook) return res.status(404).json({ message: "Ebook not found" });
            res.json({ message: "Ebook deleted" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete ebook: " + error.message });
        }
    };
    

