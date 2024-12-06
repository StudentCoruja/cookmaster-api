const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
});

const validateCategoryBody = (req, res, next) => {
  const { error } = categorySchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details.map((err) => err.message),
    });
  }

  return next();
};

module.exports = validateCategoryBody;
