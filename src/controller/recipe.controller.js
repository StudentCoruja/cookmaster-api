const recipeService = require('../service/recipe.service');

const findAllRecipes = async (req, res) => {
  const recipes = await recipeService.findAllRecipes();

  return res.status(200).json(recipes);
};

const findRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.findRecipeById(id);

  if (recipe.error) {
    return res.status(404).json({ error: recipe.error });
  }

  return res.status(200).json(recipe);
};

const createRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = await recipeService.createRecipe(recipe);

  return res.status(201).json(newRecipe);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const recipe = req.body;
  const updatedRecipe = await recipeService.validateAndUpdateRecipe(id, recipe, user);

  if (updatedRecipe.error === 'Access Denied') {
    return res.status(401).json({ error: updatedRecipe.error });
  }

  if (updatedRecipe.error) {
    return res.status(404).json({ error: updatedRecipe.error });
  }

  return res.status(200).json({ message: updatedRecipe.message });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const removeRecipe = await recipeService.validateAndDeleteRecipe(id, user);

  if (removeRecipe.error === 'Access Denied') {
    return res.status(401).json({ error: removeRecipe.error });
  }

  if (removeRecipe.error) {
    return res.status(404).json({ error: removeRecipe.error });
  }

  return res.status(204).end();
};

module.exports = {
  findAllRecipes,
  findRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
