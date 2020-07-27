const router = require('express').Router();
const db = require('./auth-model');
const orgDB = require('../organization/organization-model');
const restricted = require('../../middlewares/restricted');
const {
  registerValidation,
  organizationValidation,
} = require('../../middlewares/validation');

router.post(
  '/',
  restricted,
  registerValidation,

  async (req, res) => {
    try {
      const data = req.headers.decodedToken;
      const user = {
        email: data.email,
        uuid: data.user_id,
        // name: req.name ? req.name : data.name,
        name: data.name,
      };
      if (user) {
        Promise.allSettled([
          db.findUserByEmail(user.email),
          orgDB.findByName(req.body.name),
        ]).then(async (values) => {
          // Values:  [ { status: 'fulfilled', value: 'User' },{ status: 'fulfilled', value: 'Org' } ]
          // if one of them has status rejected then the value of it will be undifined
          const foundUser = values[0].value;
          const existedOrg = values[1].value;

          // No Org or User is found in DB
          if (!foundUser && !existedOrg) {
            // 2. Create Org
            const createdOrg = await orgDB.add(req.body);
            // 3.  Assign User to Org and Make User Admin
            if (createdOrg) {
              user['organization_id'] = createdOrg.id;
              user['is_admin'] = true;
              // 4. Add New User
              const newUser = await db.addUser(user);
              res.status(201).json(newUser);
            }

            // Org found in DB but User is not -> Then need to Provide Organization Name, to assign User to it
          } else if (!foundUser && existedOrg) {
            user['organization_id'] = existedOrg.id;
            const newUser = await db.addUser(user);
            res.status(201).json(newUser);
            // Org and User are found
          } else {
            res.status(202).json(foundUser);
          }
        });
      }
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ message: `Users request failed ${error.message}.` });
    }
  }
);

module.exports = router;
