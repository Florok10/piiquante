const service = require('../services/user.service.js');

const registerUserHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    await service.register(email, password);
  } catch (err) {
    return res.status(400).send(err);
  }
  const user = { email, password };
  return res.code(203).json(user);
};

const getUsersHandler = async () => {
  try {
    const users = await service.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await service.get(id);
    res.status(200).json(user);
  } catch (err) {
    res.send(err);
  }
};

const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { email, password } = res.body;
  try {
    const user = await service.update({ _id: id, email, password });
    res.json(user);
  } catch (err) {
    res.send(err);
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await service.remove(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  registerUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
  deleteUserHandler,
};
