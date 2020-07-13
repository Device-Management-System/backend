const router = require('express').Router();
const db = require('./users-model');
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

router.get('/', async (req, res) => {
  try {
    const allUsers = await db.findAll();
    if (allUsers) {
      res.status(200).json({ allUsers });
    } else {
      res.status(404).json({ message: 'No users exists' });
    }
  } catch (error) {
    res.status(500).json({ message: `Users request failed ${error.message}.` });
  }
});

/**
 * @desc    Get User by ID
 * @route   GET api/users/:id
 */

router.get('/:id', idValidation, async (req, res) => {
  try {
    const user = await db.findById(req.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `User not found!` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to retrieve the user ${error.message}` });
  }
});

/**
 * @desc    Add a new user to database
 * @route   POST api/users/
 */

router.post('/', userValidation, async (req, res) => {
  try {
    const newUser = await db.add(req.body);
    if (newUser) {
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: `Your user could not be posted ${error.message}.` });
  }
});

/**
 * @desc    Update a single user
 * @route   PUT api/users/:id
 */

router.put('/:id', idValidation, userValidation, async (req, res) => {
  try {
    const user = await db.findById(req.id);
    if (!user) {
      res.status(404).json({ message: 'The user is not found.' });
    } else {
      const updatedUser = await db.update(req.id, req.update);
      res.status(201).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: `User update failed ${error.message}.` });
  }
});

/**
 * @desc    Delete a single user
 * @route   Delete api/users/:id
 */

router.delete('/:id', idValidation, async (req, res) => {
  try {
    const deletedUser = await db.remove(req.id);
    if (deletedUser) {
      res.status(200).json({ deletedUser });
    } else {
      res.status(404).json({ message: 'The user is not found.' });
    }
  } catch (error) {
    res.status(500).json({
      message: `User could not be deleted: ${error.message}.`,
    });
  }
});

module.exports = router;
