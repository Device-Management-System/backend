const router = require('express').Router();
const db = require('./users-model');

// api/users

// Get All Users
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

module.exports = router;
