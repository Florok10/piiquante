const service = require('../services/sauce.service.js');

const createHandler = async (req, res) => {
  const sauce = req.body;
  try {
    const result = await service.create(sauce);
    res.status(result.code).json({ message: result.message });
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

const getAllHandler = async (req, res) => {
  try {
    const result = await service.getAll();
    res.status(result.code).json(result.sauces);
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

const getHandler = async (req, res) => {
  try {
    const result = await service.get(req.params.id);
    res.status(result.code).json(result.sauce);
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  createHandler,
  getAllHandler,
  getHandler,
};
