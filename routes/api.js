const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/post_controller');
const comment_controller = require('../controllers/comment_controller');
const user_controller = require('../controllers/user_controller');
const verifyToken = require('../config/jwtAuth');
const verifyAdmin = require('../config/verifyAdmin');

// Homepage
router.get('/', function (req, res, next) {
  res.send("Homepage");
})

/// Posts ///

// Get posts
router.get('/posts', post_controller.post_list);

// Get published posts
router.get('/posts/published', post_controller.post_published);

// Get a specific post
router.get('/posts/:postId', post_controller.post_detail);

// Post a post
router.post('/posts', verifyToken, verifyAdmin, post_controller.post_create);

// Edit a specific post
router.put('/posts/:postId', verifyToken, verifyAdmin, post_controller.post_update);

// Delete a specific post
router.delete('/posts/:postId', verifyToken, verifyAdmin, post_controller.post_delete);

/// Comments ///

// Get comments for a specific post
router.get('/posts/:postId/comments', comment_controller.comment_list);

// Post a new comment for a specific post
router.post('/posts/:postId/comments', verifyToken, comment_controller.comment_create);

// Delete a comment
router.delete('/comments/:commentId', verifyToken, verifyAdmin, comment_controller.comment_delete);

/// Users ///

// User signup
router.post('/users', user_controller.signup_post);

// User login
router.post('/login', user_controller.login_post);

module.exports = router;