    const ForumPost = require('../../models/resources/forumPost');

    // Get all posts
    exports.getAllForumPosts = async (req, res) => {
        try {
            const posts = await ForumPost.find().sort({ createdAt: -1 });
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch posts: " + error.message });
        }
    };
    
    // Create new post
    exports.createForumPost = async (req, res) => {
        const { title, content, authorName } = req.body;
        const userId = req.user._id; // Get user ID from 'protect' middleware
        
        if (!title || !content || !authorName) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const newPost = new ForumPost({ title, content, authorName, userId });
        try {
            const savedPost = await newPost.save();
            res.status(201).json(savedPost);
        } catch (error) {
            res.status(400).json({ message: "Failed to create post: " + error.message });
        }
    };
    
    // Add a comment
    exports.addComment = async (req, res) => {
        const { authorName, content } = req.body;
        const userId = req.user._id;
        
        if (!authorName || !content) {
            return res.status(400).json({ message: 'Missing comment content' });
        }
        
        try {
            const post = await ForumPost.findById(req.params.id);
            if (!post) return res.status(404).json({ message: "Post not found" });
            
            const newComment = { authorName, content, userId };
            post.comments.push(newComment);
            
            await post.save();
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ message: "Failed to add comment: " + error.message });
        }
    };
    
    // Delete a post (Admin or original author)
    exports.deleteForumPost = async (req, res) => {
        try {
            const post = await ForumPost.findById(req.params.id);
            if (!post) return res.status(404).json({ message: "Post not found" });

            // Check if user is admin or the post author
            if (req.user.role === 'admin' || post.userId.equals(req.user._id)) {
                await post.remove();
                res.json({ message: "Post deleted" });
            } else {
                res.status(403).json({ message: "User not authorized" });
            }
        } catch (error) {
            res.status(500).json({ message: "Failed to delete post: " + error.message });
        }
    };
    



