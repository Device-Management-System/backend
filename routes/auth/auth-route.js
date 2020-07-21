const router = require('express').Router();
const db = require('./auth-model');
const restricted = require('../../middlewares/restricted');
const { registerValidation } = require('../../middlewares/validation');

router.post('/', restricted, registerValidation, async (req, res) => {
  try {
    const data = req.headers.decodedToken;
    const user = {
      email: data.email,
      uuid: data.user_id,
      name: req.name ? req.name : data.name,
    };
    if (user) {
      const logIn = await db.findUserByEmail(user.email);
      // console.log(logIn.length);
      if (!logIn.length) {
        const newUser = await db.addUser(user);
        res.status(201).json(newUser);
      } else {
        res.status(202).json(logIn);
      }
      // } else {
      //   res.status(404).json('error with token');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: `Users request failed ${error.message}.` });
  }
});

module.exports = router;
