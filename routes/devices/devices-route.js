const router = require('express').Router();
const db = require('./devices-model.js');

/**
 * @desc    Add a new device to the database
 * @route   POST /api/devices/
 */
router.post('/', async (req, res) => {
  try {
    const device = await db.add(req.body);
    res.status(200).json(device);
  } catch ({ message }) {
    console.log(message);
    res.status(500).json({ message: 'Unable to create device the device' });
  }
});

/**
 * @desc    Get all devices
 * @route   GET /api/device
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
 * @desc    Get a single device by id
 * @route   GET /api/devices/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const device = await db.findById(req.params.id);
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
router.put('/:id', async (req, res) => {
  try {
    const device = await db.update(req.params.id, req.body);
    if (!device) res.status(404).json({ message: 'Device not found' });
    else res.status(200).json(device);
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to update the device.' });
  }
});

/**
 * @desc    Remove a single device
 * @route   DELETE /api/devices/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const device = await db.remove(req.params.id);
    if (!device) res.status(404).json({ message: 'Device not found' });
    else res.status(200).json({ message: 'Device successfully deleted.' });
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to delete the device.' });
  }
});

module.exports = router;
