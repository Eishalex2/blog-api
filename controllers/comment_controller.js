const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Get all comments for a post
exports.comment_list = asyncHandler(async (req, res, next) => {
  const allComments = await Comment.find({ post: req.params.postId })
    .populate("author", "username")
    .sort({ timestamp: -1} );

  res.json(allComments);
});

// Create a comment. Protected
exports.comment_create = [
  body("content", "Content must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array()
      });
      return;
    } else {
      const comment = new Comment({
        author: req.user._id,
        post: req.params.postId,
        content: req.body.content
      });
      await Comment.create(comment);
      res.json(comment.populate("author"));
    }
  })
]

// Delete a comment. Protected
exports.comment_delete = asyncHandler(async (req, res, next) => {
  const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);

  res.json({ deletedComment });
});