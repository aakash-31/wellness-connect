const Post = require('../models/Post');

// @desc    Get posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create post
// @route   POST /api/posts
// @access  Public
const createPost = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const post = await Post.create({
      author: req.user._id,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category || 'General',
    });
    
    // Populate author so frontend receives username immediately
    await post.populate('author', 'username');

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Like / Unlike a post (toggle)
// @route   PUT /api/posts/:id/like
// @access  Private
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user._id.toString();

    // Guard: migrate old Number-based likes to array
    if (!Array.isArray(post.likes)) post.likes = [];

    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a post (author only)
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.deleteOne({ _id: post._id });
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  likePost,
  deletePost,
};
