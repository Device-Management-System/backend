const db = require('../routes/users/users-model');

module.exports = async (req, res, next) => {
  try {
    const foundUser = await db.findByID(req.userID);
    if (!foundUser) res.status(404).json(`User not found`);
    else {
      req.user = foundUser;
      next();
    }
  } catch (err) {
    res.status(500).json({ errorMessage: `Couldn't retrieve userInfo.` });
  }
};
