const service = require('../services/sauce.service.js');

const createHandler = (req, res) => {
  service
    .create(
      { ...req.body, file: req.file, userId: req.auth.userId },
      req.protocol,
      req.get('host')
    )
    .then((result) => res.status(result.code).json({ message: result.message }))
    .catch((err) => {
      res.status(err.code).json({ message: err.message });
    });
};

const getAllHandler = (req, res) => {
  service
    .getAll()
    .then((result) => res.status(result.code).json(result.sauces))
    .catch((err) => res.status(err.code).json({ message: err.message }));
};

const getHandler = (req, res) => {
  service
    .get(req.params.id)
    .then((result) => res.status(result.code).json(result.sauce))
    .catch((err) => res.status(err.code).json({ message: err.message }));
};

const updateHandler = (req, res) => {
  service
    .update(
      {
        ...req.body,
        file: req.file,
        userId: req.auth.userId,
        id: req.params.id,
      },
      req.protocol,
      req.get('host')
    )
    .then((result) => res.status(result.code).json({ message: result.message }))
    .catch((err) => res.status(err.code).json({ message: err.message }));
};

const removeHandler = (req, res) => {
  service
    .remove(req.params.id)
    .then((result) => res.status(result.code).json({ message: result.message }))
    .catch((err) => res.status(err.code).json({ message: err.message }));
};

const likeHandler = (req, res) => {
  service
    .like(req.params.id, req.body.userId, req.body.like)
    .then((result) => res.status(result.code).json({ message: result.message }))
    .catch((err) => res.status(err.code).json({ message: err.message }));
};

module.exports = {
  createHandler,
  getAllHandler,
  getHandler,
  updateHandler,
  removeHandler,
  likeHandler,
};
