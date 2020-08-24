const router = require('express').Router();
const db = require('./auth-model');
const orgDB = require('../organization/organization-model');
const {
  tokenVerification: restricted,
} = require('../../middlewares/restricted');
// const {
//   registerValidation,
//   organizationValidation,
// } = require('../../middlewares/validation');

/*
 * @desc
 * @route   POST /api/auth
 */

router.post('/', restricted, async (req, res) => {
  try {
    const user = {
      id: req.body.id,
      email: req.body.email,
      name: req.body.name,
    };
    if (user) {
      const foundUser = await db.findUserByID(user.id);
      if (foundUser) {
        res.status(202).json(foundUser);
      } else {
        const newUser = await db.addUser(user);
        res.status(201).json(newUser);
      }
    } else {
      res.status(404).json('Error finding provided user ');
    }
  } catch (error) {
    res.status(500).json({ message: `Users request failed ${error.message}.` });
  }
});

module.exports = router;
