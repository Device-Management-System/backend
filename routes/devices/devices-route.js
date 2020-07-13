const router = require('express').Router();
const db = require('./devices-model.js');
const restricted = require('../../middlewares/restricted.js');
const {
  deviceValidation,
  idValidation,
} = require('../../middlewares/validation.js');
const authorized = require('../../middlewares/Authorized.js');

/**
 * @desc    Add a new device to the database
 * @route   POST /api/devices/
 * @access  Private, Admin
 */
router.post(
  '/',
  restricted,
  authorized('admin'),
  deviceValidation,
  async (req, res) => {
    try {
      const device = await db.add(req.device);
      res.status(201).json(device);
    } catch ({ message }) {
      res.status(500).json({ message: 'Unable to create device the device' });
    }
  }
);

/**
 * @desc    Get all devices
 * @route   GET /api/devices
 * @access  Private, Admin
 */
router.get('/', restricted, authorized('admin'), async (req, res) => {
  try {
    const devices = await db.findAll();
    res.status(200).json(devices);
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to retrieve devices.' });
  }
});

/**
 * @desc    Get a single device by id
 * @route   GET /api/devices/:id
 * @access  Private, Admin, User
 */
router.get(
  '/:id',
  restricted,
  authorized('admin'),
  idValidation,
  async (req, res) => {
    try {
      const device = await db.findById(req.id);
      if (device) res.status(200).json(device);
      else res.status(404).json({ message: `Device not found!` });
    } catch ({ message }) {
      res.status(500).json({ message: 'Unable to retrieve the device.' });
    }
  }
);

/**
 * @desc    Update a single device
 * @route   PUT /api/devices/:id
 * @access  Private, Admin
 */
router.put(
  '/:id',
  restricted,
  authorized('admin'),
  idValidation,
  deviceValidation,
  async (req, res) => {
    try {
      const device = await db.findById(req.id);
      if (!device) res.status(404).json({ message: 'Device not found.' });
      else {
        const device = await db.update(req.id, req.update);
        res.status(201).json(device);
      }
    } catch ({ message }) {
      res.status(500).json({ message: 'Unable to update the device.' });
    }
  }
);

/**
 * @desc    Remove a single device
 * @route   DELETE /api/devices/:id
 * @access  Private, Admin
 */
router.delete(
  '/:id',
  restricted,
  authorized('admin'),
  idValidation,
  async (req, res) => {
    try {
      const device = await db.remove(req.id);
      if (!device) res.status(404).json({ message: 'Device not found' });
      else res.status(200).json({ message: 'Device successfully deleted.' });
    } catch ({ message }) {
      res.status(500).json({ message: 'Unable to delete the device.' });
    }
  }
);

module.exports = router;
