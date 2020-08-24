const Joi = require('@hapi/joi');

// Validation for Register
const registerValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchma = Joi.object().keys({
    name: Joi.string().min(3).max(30),
  });

  try {
    const result = await createSchma.validate(req.body);
    if (result) {
      req.name = req.body.name;
      next();
    }
  } catch ({ message }) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({
        message: 'Unexpected error.',
      });
    }
  }
};

// Validation to create and update user
const userValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(255).required(),
    email: Joi.string().email().lowercase().min(3).max(255).required(),
    uuid: Joi.string().min(3).max(128).required(),
    role: Joi.string().min(3).max(128).required(),
    is_employed: Joi.boolean(),
    is_admin: Joi.boolean(),
    organization_id: Joi.number(),
  });

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    firstname: Joi.string().alphanum().min(3).max(128),
    lastname: Joi.string().alphanum().min(3).max(128),
    email: Joi.string().email().lowercase().min(3).max(255),
    uuid: Joi.string().min(3).max(128),
    role: Joi.string().min(3).max(128),
    is_employed: Joi.boolean(),
    is_admin: Joi.boolean(),
    organization_id: Joi.number(),
  });

  try {
    if (req.method === 'POST') {
      const result = await createSchema.validateAsync(req.body);
      if (result) {
        req.user = result;
        next();
      }
    }

    if (req.method === 'PUT') {
      const result = await updateSchema.validateAsync(req.body);
      if (result) {
        req.update = result;
        next();
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({
        message: 'Unexpected error.',
      });
    }
  }
};

// Validation to create and update a device.
const deviceValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    device_model: Joi.string().alphanum().min(3).max(255).required(),
    serial_number: Joi.string().alphanum().min(3).max(255).required(),
    os: Joi.string().min(2).max(128).required(),
    brand: Joi.string().min(2).max(128).required(),
    is_active: Joi.boolean(),
    user_id: Joi.number(),
  });

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    device_model: Joi.string().alphanum().min(3).max(255),
    serial_number: Joi.string().alphanum().min(3).max(255),
    os: Joi.string().min(2).max(128),
    brand: Joi.string().min(2).max(128),
    is_active: Joi.boolean(),
    user_id: Joi.number(),
  });

  try {
    if (req.method === 'POST') {
      const result = await createSchema.validateAsync(req.body);
      if (result) {
        req.device = result;
        next();
      }
    }

    if (req.method === 'PUT') {
      const result = await updateSchema.validateAsync(req.body);
      if (result) {
        req.update = result;
        next();
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({
        message: 'Unexpected error.',
      });
    }
  }
};

// Validation to create and update a request.
const requestValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    device_id: Joi.number().required(),
    user_id: Joi.number().required(),
    note: Joi.string().min(6).max(500).required(),
  });

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    device_id: Joi.number(),
    user_id: Joi.number(),
    note: Joi.string().min(6).max(500),
  });

  try {
    if (req.method === 'POST') {
      const result = await createSchema.validateAsync(req.body);
      if (result) {
        req.request = result;
        next();
      }
    }

    if (req.method === 'PUT') {
      const result = await updateSchema.validateAsync(req.body);
      if (result) {
        req.update = result;
        next();
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({ message: 'Unexpected error.' });
    }
  }
};

const organizationValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    name: Joi.string().min(3).max(128).required(),
  });

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    name: Joi.string().min(3).max(128).required(),
  });

  try {
    if (req.method === 'POST') {
      const result = await createSchema.validateAsync(req.body);
      if (result) {
        req.org = result;
        next();
      }
    }

    if (req.method === 'PUT') {
      const result = await updateSchema.validateAsync(req.body);
      if (result) {
        req.update = result;
        next();
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({
        message: 'Unexpected error.',
      });
    }
  }
};

// Validation for uuid parameters
const uuidValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.params.id
  @method   GET, PUT, & DELETE
*/
  const uuidParam = Joi.string().uuid();
  try {
    const result = await uuidParam.validateAsync(req.params.id);
    if (result) {
      req.uuid = result;
      next();
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 400;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({ message: 'Unexpected error.' });
    }
  }
};

// Validation for id parameters
const idValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.params.id
  @method   GET, PUT, & DELETE
  */
  const idParam = Joi.string().min(1).max(128);
  try {
    const result = await idParam.validateAsync(req.params.id);
    if (result) {
      req.id = result;
      next();
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 400;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({ message: 'Unexpected error.' });
    }
  }
};

module.exports = {
  registerValidation,
  userValidation,
  deviceValidation,
  requestValidation,
  organizationValidation,
  uuidValidation,
  idValidation,
};
