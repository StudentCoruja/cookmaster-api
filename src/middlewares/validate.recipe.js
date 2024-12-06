const Joi = require('joi');

const recipeCreateSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  ingredients: Joi.string().min(10).max(150).required(),
  preparation: Joi.string().min(10).required(),
  userId: Joi.number().integer().required(),
  categoryIds: Joi.array().items(Joi.number()).min(1).required(),
});

const validateCreateRecipe = (req, res, next) => {
  const { error } = recipeCreateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details.map((err) => err.message),
    });
  }

  return next();
};

const recipeUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  ingredients: Joi.string().min(10).max(150).required(),
  preparation: Joi.string().min(10).required(),
  categoryIds: Joi.array().items(Joi.number()).min(1).required(),
});

const validateUpdateRecipe = (req, res, next) => {
  const { error } = recipeUpdateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details.map((err) => err.message),
    });
  }

  return next();
};

module.exports = {
  validateCreateRecipe,
  validateUpdateRecipe,
};
