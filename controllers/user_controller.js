const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

function issueJWT(_id) {
  return jwt.sign({_id}, process.env.TOKEN_SECRET, { expiresIn: '1 day' });
}

// Sign up new user
exports.signup_post = [
  body('username', 'Username is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          user.password = hashedPassword;

          const token = issueJWT(user._id);
          user.token = token;

          await user.save();
          res.json({
            message: 'User created successfully'
          })
        } catch (err) {
          return next(err)
        }
      })
    }
  })
]

// User login
exports.login_post = [
  body("username", "Username is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  
  asyncHandler(async (req, res, next) => {
  // Mock user (authentication would go here)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({errors: errors.array()});
      return;
    }

    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
          throw new Error('Incorrect password');
        } else {
          const token = issueJWT(user._id);
          user.token = token;
          res.json({
            user: user.username,
            token
          })
        }
      }
    } catch (error) {
      next(error);
    }
  })
]