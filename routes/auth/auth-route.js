const router = require('express').Router();
const db = require('./auth-model');
const orgDB = require('../organization/organization-model');
const restricted = require('../../middlewares/restricted');
// const {
//   registerValidation,
//   organizationValidation,
// } = require('../../middlewares/validation');

/*
 * @desc
 * @route   POST /api/auth
 */

router.post(
  '/',
  restricted,

  async (req, res) => {
    try {
      const tokeUserData = req.headers.decodedToken;
      console.log('DATA FROM TOKEN => ', tokeUserData);
      res.status(200);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ message: `Users request failed ${error.message}.` });
    }
  }
);

module.exports = router;
