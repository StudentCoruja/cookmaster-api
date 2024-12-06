const camelize = require('camelize');
const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM users;');
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await conn.execute('SELECT * FROM users WHERE id = ?;', [id]);
  return camelize(result[0]);
};

const create = async (user) => {
  const { name, email, password, role } = user;
  const [result] = await conn.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?);',
    [name, email, password, role],
  );

  return { id: result.insertId, ...user };
};

const update = async (id, user) => {
  const { name, email, role } = user;
  const [result] = await conn.execute(
    'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?;',
    [name, email, role, id],
  );

  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await conn.execute('DELETE FROM users WHERE id = ?;', [id]);

  return result.affectedRows;
};

const findByEmail = async (email) => {
  const [result] = await conn.execute('SELECT * FROM users WHERE email = ?;', [email]);
  return camelize(result[0]);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  findByEmail,
};
