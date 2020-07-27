const router = require('express').Router();
const db = require('./requests-model.js');
const userDB = require('../users/users-model.js');
const restricted = require('../../middlewares/restricted.js');

const {
  requestValidation,
  idValidation,
} = require('../../middlewares/validation.js');

// To-Do: add org id check to post, get all, get by id and delete routes

/**
 * @desc    Add a new request in the database
 * @route   POST /api/requests
 * @access  Private, User
 */
router.post('/', restricted, requestValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (foundUser) {
      const request = await db.add(req.request);
      res.status(201).json(request);
    } else {
      res
        .status(404)
        .json({ message: `The was an error while creating request.` });
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to create the request.' });
  }
});

/**
 * @desc    Get all the requests in the database
 * @route   GET /api/requests
 * @access  Private, Admin
 */
router.get('/', restricted, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (foundUser && foundUser.is_admin) {
      const requests = await db.findAll();
      res.status(200).json(requests);
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch ({ message }) {
    res
      .status(500)
      .json({ message: 'Unable to retrieve requests from the server.' });
  }
});

/**
 * @desc    Get a single request from the database
 * @route   GET /api/requests/:id
 * @access  Private, Admin, User
 */
router.get('/:id', restricted, idValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (foundUser && foundUser.is_admin) {
      const request = await db.findById(req.id);
      res.status(200).json(request);
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch ({ message }) {
    res
      .status(500)
      .json({ message: 'Unable to retrieve the request from the server.' });
  }
});

/**
 * @desc    Get all User's request from the database
 * @route   GET /api/requests/user/:id
 * @access  Private, Admin, User
 */

router.get('/user/:id', restricted, idValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (foundUser) {
      const allUserRequests = await db.findAllByUserId(req.id);
      res.status(200).json(allUserRequests);
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch ({ message }) {
    res.status(500).json({
      message: 'Unable to retrieve all user requests from the server.',
    });
  }
});

/**
 * @desc    Update a single request
 * @route   PUT /api/requests/:id
 * @access  Private, User
 */
router.put(
  '/:id',
  restricted,
  idValidation,
  requestValidation,
  async (req, res) => {
    try {
      const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
      if (foundUser) {
        const requestToUpdate = await db.findById(req.id);
        if (requestToUpdate) {
          const updatedRequest = await db.update(req.id, req.update);
          res.status(201).json(updatedRequest);
        } else {
          res.status(404).json({ message: 'Request not found.' });
        }
      }
    } catch ({ message }) {
      res.status(500).json({ message: 'Unable to Update the request.' });
    }
  }
);

/**
 * @desc    Remove a single request
 * @route   DELETE /api/requests/:id
 * @access  Private, User
 */
router.delete('/:id', restricted, idValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (foundUser) {
      const requestToDelete = await findById(req.id);
      if (requestToDelete) {
        const deletedRequest = await db.remove(req.id);
        res.status(200).json({ message: 'Request successfully deleted.' });
      } else {
        res.status(404).json({ message: 'Request not found.' });
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to delete request.' });
  }
});

module.exports = router;
