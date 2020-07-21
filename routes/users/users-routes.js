const router = require('express').Router();
const db = require('./users-model');
const userDB = require('../users/users-model.js');
const restricted = require('../../middlewares/restricted');
const {
  userValidation,
  idValidation,
} = require('../../middlewares/validation.js');

// api/users

/**
 * @desc    Get All Users
 * @route   GET api/users
 */

router.get('/', restricted, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (foundUser && foundUser.is_admin) {
      const allUsers = await db.findAll();
      res.status(200).json({ allUsers });
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch (error) {
    res.status(500).json({ message: `Users request failed ${error.message}.` });
  }
});

/**
 * @desc    Get User by ID
 * @route   GET api/users/:id
 */

router.get('/:id', restricted, idValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (foundUser && foundUser.is_admin) {
      const user = await db.findById(req.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: `User not found!` });
      }
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to retrieve the user ${error.message}` });
  }
});

/**
 * @desc    Update a single user
 * @route   PUT api/users/:id
 */

router.put(
  '/:id',
  restricted,
  idValidation,
  userValidation,
  async (req, res) => {
    try {
      const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
      if (foundUser && foundUser.is_admin) {
        const usertoUpdate = await db.findById(req.id);
        if (usertoUpdate) {
          const updatedUser = await db.update(req.id, req.update);
          res.status(201).json(updatedUser);
        } else {
          res.status(404).json({ message: 'The user is not found.' });
        }
      } else {
        res.status(404).json({ message: `User not found!` });
      }
    } catch (error) {
      res.status(500).json({ message: `User update failed ${error.message}.` });
    }
  }
);

/**
 * @desc    Delete a single user
 * @route   Delete api/users/:id
 */

router.delete('/:id', restricted, idValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (foundUser && foundUser.is_admin) {
      const deletedUser = await db.remove(req.id);
      if (deletedUser) {
        res.status(200).json({ deletedUser });
      } else {
        res.status(404).json({ message: 'The user is not found.' });
      }
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch (error) {
    res.status(500).json({
      message: `User could not be deleted: ${error.message}.`,
    });
  }
});

module.exports = router;
