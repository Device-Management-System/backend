const router = require('express').Router();
const db = require('./requests-model.js');
const restricted = require('../../middlewares/restricted.js');
const authorized = require('../../middlewares/authorized.js');
const {
  requestValidation,
  idValidation,
} = require('../../middlewares/validation.js');

/**
 * @desc    Add a new request in the database
 * @route   POST /api/requests
 * @access  Private, User
 */
router.post('/', restricted, requestValidation, async (req, res) => {
  try {
    const request = await db.add(req.request);
    res.status(201).json(request);
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to create the request.' });
  }
});

/**
 * @desc    Get all the requests in the database
 * @route   GET /api/requests
 * @access  Private, Admin
 */
router.get('/', restricted, authorized('admin'), async (req, res) => {
  try {
    const requests = await db.findAll();
    res.status(200).json(requests);
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
router.get(
  '/:id',
  restricted,
  authorized('admin'),
  idValidation,
  async (req, res) => {
    try {
      const request = await db.findById(req.id);
      if (!request) res.status(404).json({ message: 'Request not found.' });
      else res.status(200).json(request);
    } catch ({ message }) {
      res
        .status(500)
        .json({ message: 'Unable to retrieve the request from the server.' });
    }
  }
);

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
      const request = await db.findById(req.id);
      if (!request) res.status(404).json({ message: 'Request not found.' });
      else {
        const update = await db.update(req.id, req.update);
        res.status(201).json(update);
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
    const request = await findById(req.id);
    if (!request) res.status(404).json({ message: 'Request not found.' });
    else {
      await db.remove(req.id);
      res.status(200).json({ message: 'Request successfully deleted.' });
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to delete request.' });
  }
});

module.exports = router;
