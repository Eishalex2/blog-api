const jwt = require('jsonwebtoken');
require('dotenv').config();
// const passport = require('./passport');

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    // going to need to find a user somewhere in there.
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        // Incorrect token
        res.sendStatus(403);
      } else {
        req.user = user;
        next();
      }

    });
  } else {
    // No token
    res.sendStatus(401);
  }
}

// function verifyToken(req, res, next) {
//   passport.authenticate('jwt', { session: false }, (err, user, info) => {
//     if (err) {
//       res.sendStatus(403);
//     }
//     if (!user) {
//       res.sendStatus(401);
//     } else {
//       req.user = user;
//       next();
//     }
//   })(req, res, next);
// }

module.exports = verifyToken;