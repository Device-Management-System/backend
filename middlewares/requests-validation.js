const Joi = require('@hapi/joi');

const validation = async (req, res, next) => {
  const schema = Joi.object().keys({
    device_id: Joi.number().required(),
    user_id: Joi.number().required(),
    note: Joi.string().min(6).max(255).required(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    if (value) next();
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Missing field, unable to create the request.' });
  }
};

module.exports = validation;
