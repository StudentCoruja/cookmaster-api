const bcrypt = require('bcryptjs');

const userModel = require('../model/user.model');
const { createToken } = require('../utils/manager.JWT');

const findAllUsers = async () => {
  const users = await userModel.findAll();

  return users;
};

const findUserById = async (id) => {
  const user = await userModel.findById(id);

  if (!user) return { error: `User with id ${id} not found` };

  return user;
};

const createUser = async (user) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password, salt);

  const newUserWithBcrypt = { ...user, password: hashedPassword };
  const newUser = await userModel.create(newUserWithBcrypt);

  const { password: _, ...userWithoutPassword } = newUser;
  const token = createToken(userWithoutPassword);

  return token;
};

const updateUser = async (id, user) => {
  const updatedUser = await userModel.update(id, user);

  if (updatedUser === 0) return { error: `User with id ${id} not found` };

  return { message: 'User updated successfully' };
};

const deleteUser = async (id) => {
  const removeUser = await userModel.remove(id);

  if (removeUser === 0) return { error: `User with id ${id} not found` };

  return { message: 'User deleted successfully' };
};

const findUserByEmail = async ({ email, password }) => {
  const user = await userModel.findByEmail(email);

  if (!user) return { error: 'Invalid fields' };

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) return { error: 'Invalid fields' };

  const { id, name, role } = user;
  const token = createToken({ id, name, email, role });

  return token;
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail,
};
