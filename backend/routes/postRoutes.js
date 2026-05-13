const express = require('express');
const router = express.Router();
const { getPosts, createPost, likePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPosts).post(protect, createPost);
router.put('/:id/like', protect, likePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
