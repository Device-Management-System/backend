const Joi = require('@hapi/joi');

// Validation to create add a new device.
const deviceValidation = async (req, res, next) => {
  const deviceSchema = Joi.object().keys({
    device_model: Joi.string().alphanum().min(3).max(255).required(),
    serial_number: Joi.string().alphanum().min(3).max(255).required(),
    os: Joi.string().min(3).max(128).required(),
    brand: Joi.string().min(3).max(128).required(),
  });

  try {
    const result = await deviceSchema.validateAsync(req.body);
    if (result) {
      req.device = result;
      next();
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json(error.details[0].message);
    } else {
      res.status(500).json({ message: 'Unexpected error.' });
    }
  }
};

// Validation to create a new request.
const requestValidation = async (req, res, next) => {
  const requestSchema = Joi.object().keys({
    device_id: Joi.number().required(),
    user_id: Joi.number().required(),
    note: Joi.string().min(6).max(255).required(),
  });

  try {
    const result = await requestSchema.validateAsync(req.body);
    if (result) {
      req.request = result;
      next();
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json(error.details[0].message);
    } else {
      res.status(500).json({ message: 'Unexpected error.' });
    }
  }
};

module.exports = {
  deviceValidation,
  requestValidation,
};
