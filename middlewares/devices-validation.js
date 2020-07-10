const Joi = require('@hapi/joi');

const validation = async (req, res, next) => {
  const schema = Joi.object().keys({
    device_model: Joi.string().alphanum().min(3).max(255).required(),
    serial_number: Joi.string().alphanum().min(3).max(255).required(),
    os: Joi.string().min(3).max(128).required(),
    brand: Joi.string().min(3).max(128).required(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    if (value) next();
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Missing field, unable to create the device.' });
  }
};

module.exports = validation;
