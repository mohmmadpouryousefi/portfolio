const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/posts/:slug
// @desc    Get post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/posts
// @desc    Create a post
// @access  Private (admin only)
router.post('/', auth, async (req, res) => {
  // Check if user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  const { title, excerpt, content, category, image } = req.body;

  try {
    const newPost = new Post({
      title,
      excerpt,
      content,
      category,
      image
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/:id
// @desc    Update a post
// @access  Private (admin only)
router.put('/:id', auth, async (req, res) => {
  // Check if user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Update post
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private (admin only)
router.delete('/:id', auth, async (req, res) => {
  // Check if user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;