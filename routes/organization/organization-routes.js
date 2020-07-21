const router = require('express').Router();
const db = require('./organization-model.js');
const restricted = require('../../middlewares/restricted');
const {
  idValidation,
  organizationValidation,
} = require('../../middlewares/validation.js');

// /api/organization

/**
 * @desc    Add a new organization to the database
 * @route   POST /api/organization/
 * @access  Private, Admin
 */

router.post('/', restricted, organizationValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (foundUser && foundUser.is_admin) {
      const organization = await db.add(req.org);
      res.status(201).json(organization);
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to create organization' });
  }
});

/**
 * @desc    Get organization by id
 * @route   GET /api/organization/:id
 * @access  Private, Admin
 */

router.get('/:id', restricted, idValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (
      foundUser &&
      foundUser.is_admin &&
      foundUser.organization_id === req.id
    ) {
      const organization = await db.findById(req.id);
      res.status(200).json(organization);
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to retrieve the organization.' });
  }
});

/**
 * @desc    Update a organization
 * @route   PUT /api/organization/:id
 * @access  Private, Admin
 */
router.put(
  '/:id',
  restricted,
  idValidation,
  organizationValidation,
  async (req, res) => {
    try {
      const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
      if (
        foundUser &&
        foundUser.is_admin &&
        foundUser.organization_id === req.id
      ) {
        const updatedOrg = await db.update(req.id, req.update);
        res.status(201).json(updatedOrg);
      } else {
        res.status(403).json({ message: 'Access denied!' });
      }
    } catch ({ message }) {
      res.status(500).json({ message: 'Unable to update the organization.' });
    }
  }
);

/**
 * @desc    Remove organization
 * @route   DELETE /api/organization/:id
 * @access  Private, Admin
 */
router.delete('/:id', restricted, idValidation, async (req, res) => {
  try {
    const foundUser = await userDB.findByUUID(req.headers.decodedToken.uid);
    if (
      foundUser &&
      foundUser.is_admin &&
      foundUser.organization_id === req.id
    ) {
      const deletedOrg = await db.remove(req.id);
      if (deletedOrg) {
        res.status(200).json({ message: 'Organization successfully deleted.' });
      } else {
        res.status(404).json({ message: 'Organization not found' });
      }
    } else {
      res.status(403).json({ message: 'Access denied!' });
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to delete organization.' });
  }
});
