const express = require('express');

const recipeController = require('../controller/recipe.controller');
const validateRecipe = require('../middlewares/validate.recipe');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', recipeController.findAllRecipes);
router.get('/:id', recipeController.findRecipeById);

router.post('/',
  authenticateToken,
  validateRecipe.validateCreateRecipe,
  recipeController.createRecipe);

router.put('/:id',
  authenticateToken,
  validateRecipe.validateUpdateRecipe,
  recipeController.updateRecipe);

router.delete('/:id', authenticateToken, recipeController.deleteRecipe);

module.exports = router;
