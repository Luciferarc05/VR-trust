    const express = require('express');
    const router = express.Router();
    const forumController = require('../../controllers/resources/forumController');
    const { protect, admin } = require('../../middleware/auth'); // Auth middleware

    // --- Forum Post Routes ---
    
    // GET /api/resources/forums - Get all posts (Public route)
    router.get('/forums', forumController.getAllForumPosts);

    // POST /api/resources/forums - Create a new post (Logged-in user route)
    router.post('/forums', protect, forumController.createForumPost);

    // GET /api/resources/forums/:id - Get a single post by ID (Public route)
    router.get('/forums/:id', forumController.getForumPostById);

    // PUT /api/resources/forums/:id - Update a post (Admin or author route)
    router.put('/forums/:id', protect, forumController.updateForumPost);

    // DELETE /api/resources/forums/:id - Delete a post (Admin or author route)
    router.delete('/forums/:id', protect, forumController.deleteForumPost);

    // --- Comment Routes ---

    // POST /api/resources/forums/:id/comments - Add a comment to a post (Logged-in user route)
    router.post('/forums/:id/comments', protect, forumController.addComment);
    
    // DELETE /api/resources/forums/:postId/comments/:commentId - Delete a comment (Admin or author route)
    // This route matches the controller logic for deleting comments
    router.delete('/forums/:postId/comments/:commentId', protect, forumController.deleteComment);

    
    module.exports = router;

