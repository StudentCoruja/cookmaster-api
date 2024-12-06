const userService = require('../service/user.service');

const findAllUsers = async (req, res) => {
  const users = await userService.findAllUsers();

  return res.status(200).json(users);
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.findUserById(id);

  if (user.error) {
    return res.status(404).json({ error: user.error });
  }

  return res.status(200).json(user);
};

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = await userService.createUser(user);

  return res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const updatedUser = await userService.updateUser(id, user);

  if (updatedUser.error) {
    return res.status(404).json({ error: updatedUser.error });
  }
  return res.status(200).json({ message: updatedUser });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const removedUser = await userService.deleteUser(id);

  if (removedUser.error) {
    return res.status(404).json({ error: removedUser.error });
  }

  return res.status(204).end();
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
