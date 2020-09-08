const router = require('express').Router();
const axios = require('axios');
const db = require('./auth-model');
const orgDB = require('../organization/organization-model');
const {
  tokenVerification: restricted,
} = require('../../middlewares/restricted');
// const { registerValidation } = require('../../middlewares/validation');

/*
 * @desc
 * @route   POST /api/auth
 */
router.post('/', restricted, async (req, res) => {
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

        // Assign User Role on user creation

        // const authAxios = axios.create({
        //   baseURL: `${process.env.AUTH_0_AUDIENCE_API}users/${newUser.id}/roles`,
        // });

        // authAxios.interceptors.request.use((config) => {
        //   config.headers['content-type'] = 'application/json';
        //   config.headers['cache-control'] = 'no-cache';
        //   config.headers.Authorization = `Bearer ${req.apiToken}`;
        // });

        // const { data } = await authAxios.post({ roles: ['user'] });
        // console.log(data);

        res.status(201).json(newUser);
      }
    } else {
      res.status(404).json('Error finding provided user ');
    }
  } catch (error) {
    res.status(500).json({ message: `Users request failed ${error.message}.` });
  }
});

module.exports = router;
