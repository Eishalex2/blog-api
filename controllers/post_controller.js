const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Get all posts
exports.post_list = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().exec();

  res.json(posts);
});

// Get published posts
exports.post_published = asyncHandler(async (req, res, next) => {
  const published_posts = await Post.find({ published: true }).exec();

  res.json(published_posts);
})

// Get one post
exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).exec();

  res.json(post);
});

// Create a new post (protected)
exports.post_create = [
  // Validate and sanitize
  body("title", "Title is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "content is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user).exec();

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array()
      });
      return;
    } else {
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: user
      });
      await Post.create(post);
      res.json(post);
    }
  })
]

// Update a post (protected)
exports.post_update = [
  // Validate and sanitize
  body("title", "Title is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "content is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      _id: req.params.postId
    });

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array()
      });
      return;
    } else {
      const updatedPost = await Post.findByIdAndUpdate(req.params.postId, post, {});
      res.json(updatedPost);
    }
  })
]

// Delete a post (protected)
exports.post_delete = asyncHandler(async (req, res, next) => {
  // Delete the post and all comments attached to it
  const post = await Post.findByIdAndDelete(req.params.postId);
  const deletedComments = await Comment.deleteMany({ post: req.params.postId });

  res.json({ post, deletedComments });
});