const conn = require('./connection');

const create = async (recipeCategory) => {
  const [recipeId, categoryId] = recipeCategory;
  const [result] = await conn.execute(
    'INSERT INTO recipes_categories (recipe_id, category_id) VALUES (?, ?);',
    [recipeId, categoryId],
  );

  return result;
};

const remove = async (recipeId) => {
  const [result] = await conn.execute(
    'DELETE FROM recipes_categories WHERE recipe_id = ?;',
    [recipeId],
  );

  return result;
};

module.exports = {
  create,
  remove,
};
