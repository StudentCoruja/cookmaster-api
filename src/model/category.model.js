const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM categories;');
  return result;
};

const findById = async (id) => {
  const [result] = await conn.execute('SELECT * FROM categories WHERE id = ?;', [id]);
  return result[0];
};

const create = async (category) => {
  const { name } = category;
  const [result] = await conn.execute(
    'INSERT INTO categories (name) VALUES (?);',
    [name],
  );

  return { id: result.insertId, ...category };
};

const update = async (id, category) => {
  const { name } = category;
  const [result] = await conn.execute(
    'UPDATE categories SET name = ? WHERE id = ?;',
    [name, id],
  );

  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await conn.execute('DELETE FROM categories WHERE id = ?;', [id]);

  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
