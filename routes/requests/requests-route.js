const router = require('express').Router();
const db = require('./requests-model.js');
const validation = require('../../middlewares/requests-validation.js');
const { findById } = require('./requests-model.js');

/**
 * @desc    Add a new request in the database
 * @route   POST /api/requests
 */
router.post('/', validation, async (req, res) => {
  try {
    const requests = await db.add(req.body);
    res.status(201).json(requests);
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to create the request.' });
  }
});

/**
 * @desc    Get all the requests in the database
 * @route   GET /api/requests
 */
router.get('/', async (req, res) => {
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
 */
router.get('/', async (req, res) => {
  try {
    const request = await db.findById(req.params.id);
    if (!request) res.status(404).json({ message: 'Request not found.' });
    else res.status(200).json(request);
  } catch ({ message }) {
    res
      .status(500)
      .json({ message: 'Unable to retrieve the request from the server.' });
  }
});

/**
 * @desc    Update a single request
 * @route   PUT /api/requests/:id
 */
router.put('/:id', async (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: 'Unable to update request.' });
  }
  try {
    const request = await db.findById(req.params.id);
    if (!request) res.status(404).json({ message: 'Request not found.' });
    else {
      const update = await db.update(req.params.id, req.body);
      res.status(201).json(update);
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to Update the request.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const request = await findById(req.params.id);
    if (!request) res.status(404).json({ message: 'Request not found.' });
    else {
      await db.remove(req.params.id);
      res.status(204).json({ message: 'Request successfully deleted.' });
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to delete request.' });
  }
});

module.exports = router;
