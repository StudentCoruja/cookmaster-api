const camelize = require('camelize');
const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM recipes;');
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await conn.execute('SELECT * FROM recipes WHERE id = ?;', [id]);
  return camelize(result[0]);
};

const create = async (recipe) => {
  const { userId, title, ingredients, preparation } = recipe;
  const [result] = await conn.execute(
    'INSERT INTO recipes (user_id, title, ingredients, preparation) VALUES (?, ?, ?, ?);',
    [userId, title, ingredients, preparation],
  );

  return { id: result.insertId, ...recipe };
};

const update = async (id, recipe) => {
  const { title, ingredients, preparation } = recipe;
  const [result] = await conn.execute(
    'UPDATE recipes SET title = ?, ingredients = ?, preparation = ? WHERE id = ?;',
    [title, ingredients, preparation, id],
  );

  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await conn.execute('DELETE FROM recipes WHERE id = ?;', [id]);

  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
