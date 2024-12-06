const recipeModel = require('../model/recipe.model');
const recipesCategoriesModel = require('../model/recipes.categories.model');

const findAllRecipes = async () => {
  const recipes = await recipeModel.findAll();

  return recipes;
};

const findRecipeById = async (id) => {
  const recipe = await recipeModel.findById(id);

  if (!recipe) return { error: `Recipe with id ${id} not found` };

  return recipe;
};

const createRecipe = async (recipe) => {
  const newRecipe = await recipeModel.create(recipe);

  const { id } = newRecipe;
  const { categoryIds } = recipe;

  const arrayRecipeCategories = categoryIds.map((category) => [id, category]);

  await Promise.all(
    arrayRecipeCategories.map((recipeCategory) => recipesCategoriesModel.create(recipeCategory)),
  );

  return newRecipe;
};

const updateRecipe = async (id, recipe) => {
  const updatedRecipe = await recipeModel.update(id, recipe);

  if (updatedRecipe === 0) return { error: `Recipe with id ${id} not found` };

  const { categoryIds } = recipe;

  await recipesCategoriesModel.remove(id);

  const arrayRecipeCategories = categoryIds.map((category) => [id, category]);

  await Promise.all(
    arrayRecipeCategories.map((recipeCategory) => recipesCategoriesModel.create(recipeCategory)),
  );

  return { message: 'Recipe updated successfully' };
};

const checkUserPermission = async (id, user) => {
  if (['admin', 'manager'].includes(user.role)) return true;

  const findRecipe = await recipeModel.findById(id);

  if (!findRecipe) return { error: `Recipe with id ${id} not found` };

  if (findRecipe.userId !== user.id) return { error: 'Access Denied' };

  return true;
};

const validateAndUpdateRecipe = async (id, recipe, user) => {
  const validUser = await checkUserPermission(id, user); // Valida permissão do usuário

  if (validUser.error) return validUser;

  return updateRecipe(id, recipe); // Atualiza a receita
};

const deleteRecipe = async (id) => {
  const removeRecipe = await recipeModel.remove(id);

  if (removeRecipe === 0) return { error: `Recipe with id ${id} not found` };

  return { message: 'Recipe deleted successfully' };
};

const validateAndDeleteRecipe = async (id, user) => {
  const validUser = await checkUserPermission(id, user);

  if (validUser.error) return validUser;

  return deleteRecipe(id);
};

module.exports = {
  findAllRecipes,
  findRecipeById,
  createRecipe,
  validateAndUpdateRecipe,
  validateAndDeleteRecipe,
};
