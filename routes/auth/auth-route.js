const router = require('express').Router();
const db = require('./auth-model');
const orgDB = require('./organization-model.js');
const restricted = require('../../middlewares/restricted');
const {
  registerValidation,
  organizationValidation,
} = require('../../middlewares/validation');

router.post(
  '/',
  restricted,
  registerValidation,
  organizationValidation,
  async (req, res) => {
    try {
      const data = req.headers.decodedToken;
      const user = {
        email: data.email,
        uuid: data.user_id,
        name: req.name ? req.name : data.name,
      };
      if (user) {
        Promise.allSettled([
          db.findUserByEmail(user.email),
          orgDB.findByName(req.body.orgData.name),
        ]).then((values) => {
          // [ { status: 'fulfilled', value: 'User' },{ status: 'fulfilled', value: 'Org' } ]
          // if one of them has status rejected then value of it will be undifined
          const foundUser = values[0].value;
          const existedOrg = values[1].value;
          
          // No Org or User is found in DB
          if (!foundUser && !existedOrg) {
            // 2. Create Org
            // To-do: Check the req for org data
            const createdOrg = await orgDB.add(req.body.orgData);
            // 3.  Assign User to Org and Make User Admin
            user['organization_id'] = createdOrg.id;
            user['is_admin'] = true;
            // 4. Add New User
            const newUser = await db.addUser(user);
            res.status(201).json(newUser);
  
            // Org found in DB but User is not
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

// Notes: User in db? return the user : create org-> create user -> make user Admin

