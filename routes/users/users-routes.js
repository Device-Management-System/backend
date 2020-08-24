const router = require('express').Router();
const db = require('./users-model');
const userDB = require('../users/users-model.js');
const { tokenVerification } = require('../../middlewares/restricted');
const {
  userValidation,
  idValidation,
} = require('../../middlewares/validation.js');

// api/users

/**
 * @desc    Get All Users
 * @route   GET api/users
 * @access  Private, Admin
 */

router.get('/', tokenVerification, async (req, res) => {
  try {
    const foundUser = await userDB.findByID(req.userID);
    if (foundUser && foundUser.is_admin) {
      const allUsers = await db.findAll();
      res.status(200).json({ allUsers });
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: `Users request failed ${error.message}.` });
  }
});

/**
 * @desc    Get User by ID
 * @route   GET api/users/:id
 * @access  Private, Admin, User
 */

router.get('/:id', tokenVerification, idValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByID(req.userID);
    if ((foundUser && foundUser.is_admin) || foundUser.id === req.id) {
      const user = await db.findByID(req.id);
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
 * @access
 */

router.put(
  '/:id',
  tokenVerification,
  idValidation,
  userValidation,
  async (req, res) => {
    const userToUpdate = {
      first_name: req.update.firstname,
      last_name: req.update.lastname,
      role: req.update.role,
      is_completed: true,
    };

    try {
      const foundUser = await userDB.findByID(req.userID);
      if (foundUser) {
        if (userToUpdate) {
          const updatedUser = await db.update(req.id, userToUpdate);
          res.status(201).json(updatedUser);
        } else {
          res.status(404).json({ message: 'The user is not found.' });
        }
      } else {
        res.status(404).json({ message: `User not found!` });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: `User update failed ${error.message}.` });
    }
  }
);

/**
 * @desc    Delete a single user
 * @route   Delete api/users/:id
 * @access  Private, Admin
 */

router.delete('/:id', tokenVerification, idValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByID(req.userID);
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
