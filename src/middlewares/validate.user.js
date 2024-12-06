const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'manager', 'admin').default('user'),
});

const validateUserBody = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details.map((err) => err.message),
    });
  }

  return next();
};

module.exports = validateUserBody;
