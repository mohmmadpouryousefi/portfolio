import express from "express";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";

const router = express.Router();
// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      posts,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
});

// @route   GET api/posts/:slug
// @desc    Get post by slug
// @access  Public
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not found",
      });
    }

    res.json({
      success: true,
      post,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
});

// @route   POST api/posts
// @desc    Create a post
// @access  Private (admin only)
router.post("/", auth, async (req, res) => {
  // Check if user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      msg: "Not authorized",
    });
  }

  const { title, excerpt, content, category, image } = req.body;

  try {
    const newPost = new Post({
      title,
      excerpt,
      content,
      category,
      image,
    });

    const post = await newPost.save();
    res.json({
      success: true,
      msg: "Post created successfully",
      post,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
});

// @route   PUT api/posts/:id
// @desc    Update a post
// @access  Private (admin only)
router.put("/:id", auth, async (req, res) => {
  // Check if user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      msg: "Not authorized",
    });
  }

  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not found",
      });
    }

    // Update post
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json({
      success: true,
      msg: "Post updated successfully",
      post,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private (admin only)
router.delete("/:id", auth, async (req, res) => {
  // Check if user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      msg: "Not authorized",
    });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not found",
      });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      msg: "Post deleted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
});

export default router;
