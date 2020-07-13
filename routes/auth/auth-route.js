const router = require('express').Router();
const db = require('./auth-model');
const restricted = require('../../middlewares/restricted');

router.post('/', restricted, async (req, res) => {
  try {
    const data = req.headers.decodedToken;
    const user = {
      email: data.email,
      uuid: data.user_id,
      name: data.name,
    };
    if (user) {
      const logIn = await db.findUserByEmail(user.email);
      console.log('logIn length', logIn.length);
      if (!logIn.length) {
        const newUser = await db.addUser(user);
        res.status(201).json(newUser);
      } else {
        res.status(202).json(logIn);
      }
    } else {
      res.status(404).json('error with token');
    }
  } catch (error) {
    res.status(500).json({ message: `Users request failed ${error.message}.` });
  }
});

module.exports = router;
