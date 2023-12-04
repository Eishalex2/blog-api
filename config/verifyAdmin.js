const User = require('../models/user');

async function verifyAdmin(req, res, next) {
  const user = await User.findById(req.user).exec();

  if (user.admin) {
    next();
  } else {
    res.sendStatus(401);
  }
}

module.exports = verifyAdmin;