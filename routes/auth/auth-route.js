const router = require('express').Router();
const request = require('request');
const db = require('./auth-model');
const {
  tokenVerification: restricted,
} = require('../../middlewares/restricted');
const { registerValidation } = require('../../middlewares/validation');
const jwtCheck = require('../../middlewares/auth0');

/*
 * @desc
 * @route   POST /api/auth
 */
router.post('/', jwtCheck, restricted, async (req, res) => {
  try {
    const user = {
      id: req.body.id,
      email: req.body.email,
      name: req.body.name,
    };
    if (user) {
      const foundUser = await db.findUserByID(user.id);

      if (foundUser) {
        res.status(202).json(foundUser);
      } else {
        const newUser = await db.addUser(user);
        res.status(201).json(newUser);
      }
    }
  } catch (error) {
    res.status(500).json({ message: `Users request Log user in.` });
  }
});

// router.post('/register', registerValidation, async (req, res) => {
//   try {
//     const options = {
//       method: 'POST',
//       url: `${process.env.AUTH_0_AUDIENCE_API}users`,
//       headers: {
//         'content-type': 'application/json charset=utf-8',
//         authorization: `Bearer ${req.apiToken}`,
//         'cache-control': 'no-cache',
//       },
//       body: {
//         email: req.userInfo.email,
//         password: req.userInfo.password,
//         given_name: req.userInfo.given_name,
//         family_name: req.userInfo.family_name,
//         name: `${req.userInfo.given_name} ${req.userInfo.family_name}`,
//         nickname: req.userInfo.email,
//         connection: 'Username-Password-Authentication',
//       },
//       json: true,
//     };

//     request(options, async (error, response, body) => {
//       if (error) throw new Error(error);

//       const user = {
//         id: body.identities[0].user_id,
//         first_name: body.given_name,
//         last_name: body.family_name,
//         name: `${body.given_name} ${body.family_name}`,
//         email: body.email,
//       };

//       const foundUser = await db.findUserByID(user.id);

//       if (foundUser) {
//         res.status(409).json({ message: `User already exists.` });
//       } else {
//         const addedUser = await db.addUser(user);
//         res.status(201).json(addedUser);
//       }
//     });
//   } catch ({ message }) {
//     res.status(500).json({ errorMessage: `Couldn't register new user` });
//   }
// });

module.exports = router;
