const router = require('express').Router();
const db = require('./devices-model.js');
const userDB = require('../users/users-model.js');
const restricted = require('../../middlewares/restricted');
const {
  deviceValidation,
  idValidation,
} = require('../../middlewares/validation.js');

// /api/devices

/**
 * @desc    Add a new device to the database
 * @route   POST /api/devices/
 */
router.post('/', deviceValidation, async (req, res) => {
  try {
    const device = await db.add(req.device);
    res.status(201).json(device);
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to create device the device' });
  }
});

/**
 * @desc    Get all devices
 * @route   GET /api/devices
 */
router.get('/', async (req, res) => {
  try {
    const devices = await db.findAll();
    res.status(200).json(devices);
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to retrieve devices.' });
  }
});

/**
 * @desc    Get all users devices
 * @route   GET /api/devices
 */
router.get('/user-devices', restricted, async (req, res) => {
  const userUID = req.headers.decodedToken.uid;
  try {
    const { userID } = await userDB.findByUUID(userUID);
    if (userID) {
      const userDevices = await db.findALLByUserID(userID);
      res.status(200).json(userDevices);
    } else {
      res.status(404).json({ message: `Devices not found!` });
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to retrieve devices.' });
  }
});

/**
 * @desc    Get a single device by id
 * @route   GET /api/devices/:id
 */
router.get('/:id', idValidation, async (req, res) => {
  try {
    const device = await db.findById(req.id);
    if (device) res.status(200).json(device);
    else res.status(404).json({ message: `Device not found!` });
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to retrieve the device.' });
  }
});

/**
 * @desc    Update a single device
 * @route   PUT /api/devices/:id
 */
router.put('/:id', idValidation, deviceValidation, async (req, res) => {
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
});

/**
 * @desc    Remove a single device
 * @route   DELETE /api/devices/:id
 */
router.delete('/:id', idValidation, async (req, res) => {
  try {
    const device = await db.remove(req.id);
    if (!device) res.status(404).json({ message: 'Device not found' });
    else res.status(200).json({ message: 'Device successfully deleted.' });
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to delete the device.' });
  }
});

module.exports = router;
