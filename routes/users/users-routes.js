const router = require('express').Router();
const request = require('request');
const jwtAuthz = require('express-jwt-authz');
const db = require('./users-model');
const userDB = require('../users/users-model.js');
const { tokenVerification } = require('../../middlewares/restricted');
const {
  userValidation,
  idValidation,
} = require('../../middlewares/validation.js');
const attachUser = require('../../middlewares/attachUser');

// api/users

/**
 * @desc    Get All Users
 * @route   GET api/users
 * @access  Private, Admin
 */
router.get('/', tokenVerification, async (req, res) => {
  try {
    const foundUser = await userDB.findByID(req.userID);
    if (foundUser) {
      const allUsers = await db.findAll();
      res.status(200).json(allUsers);
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
router.get(
  '/:id',
  tokenVerification,
  idValidation,
  attachUser,
  async (req, res) => {
    try {
      if (req.user.id === req.id) {
        res.status(200).json(req.user);
      } else {
        res.status(403).json({ message: 'Access denied!' });
      }
    } catch (error) {
      res.status(500).json({ message: `Unable to retrieve the user` });
    }
  }
);

/**
 * @desc    Update a single user
 * @route   PUT api/users/:id
 * @access
 */
router.put(
  '/:id',
  tokenVerification,
  idValidation,
  attachUser,
  userValidation,
  async (req, res) => {
    const userToUpdate = {
      first_name: req.update.firstname,
      last_name: req.update.lastname,
      role: req.update.role,
      is_completed: true,
    };

    try {
      const updatedUser = await db.update(req.id, userToUpdate);
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: `User update failed.` });
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
    const deletedUser = await db.remove(req.id);
    if (deletedUser) {
      res.status(200).json({ message: 'User successfuly deleted' });
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch (error) {
    res.status(500).json({
      message: `User could not be deleted.`,
    });
  }
});

router.put(
  '/:id/role',
  tokenVerification,
  jwtAuthz(['update:roles']),
  attachUser,
  async (req, res) => {
    try {
      const auth0ID = `auth0|${req.body.id}`;

      const url = `${process.env.AUTH_0_AUDIENCE_API}users/${auth0ID}/roles`;
      const roles =
        req.body.role === 'admin'
          ? [process.env.AUTH_0_ADMIN_ROLE_ID]
          : [process.env.AUTH_0_USER_ROLE_ID];

      const options = {
        method: 'POST',
        url,
        headers: {
          'content-type': 'application/json charset=utf-8',
          authorization: `Bearer ${req.apiToken}`,
          'cache-control': 'no-cache',
        },
        body: { roles },
        json: true,
      };

      await request(options, (error, response, body) => {
        if (error) throw new Error(error);
      });

      const user = req.user;

      req.body.role === 'admin'
        ? (user.is_admin = true)
        : (user.is_admin = false);

      const result = await db.update(req.user.id, user);
      if (result) {
        res.status(201).json({
          message: `User's role was successfully updated!`,
          user: result,
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ errorMessage: `Could not update the user's role` });
    }
  }
);

router.delete(
  '/:id/role',
  tokenVerification,
  jwtAuthz(['delete:roles']),
  attachUser,
  async (req, res) => {
    try {
      const auth0ID = `auth0|${req.user.id}`;
      const url = `${process.env.AUTH_0_AUDIENCE_API}users/${auth0ID}/roles`;
      const roles = [
        `${process.env.AUTH_0_ADMIN_ROLE_ID}`,
        `${process.env.AUTH_0_USER_ROLE_ID}`,
      ];

      const options = {
        method: 'DELETE',
        url,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${req.apiToken}`,
          'cache-control': 'no-cache',
        },
        body: { roles },
        json: true,
      };

      await request(options, (error, response, body) => {
        if (error) throw new Error(error);
      });

      res.status(204).json({ message: `User's role was successfully removed` });
    } catch ({ err }) {
      res.status(500).json({ message: `Coul not remove current user's roles` });
    }
  }
);

module.exports = router;
