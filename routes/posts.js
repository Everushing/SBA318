const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Get all posts (optional query parameter for author filtering)
router.get('/posts', async (req, res) => {
  const authorId = req.query.author; // Optional author filter
  try {
    const posts = await Post.find(authorId ? { author: authorId } : {});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific post
router.get('/posts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: 'Please provide title and content' });
  try {
    const newPost = new Post({ title, content });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a post (implement PATCH for partial updates)
router.put('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: 'Please provide title and content' });
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a post
router.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    const index = posts.findIndex(p => p.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: 'Post not found' });
    posts.splice(index, 1);
    res.json({ message: 'Post deleted' });
  });
  
  module.exports = router;

