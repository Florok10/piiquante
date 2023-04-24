const SauceService = require('../services/sauce.service');

module.exports = async (req, res, next) => {
  const sauceId = req.params.id;
  const authUserId = req.auth.userId;
  SauceService.get(sauceId)
    .then((result) => {
      if (result.sauce.userId.toString() === authUserId) return next();
      res.status(403).json({ message: 'Unauthorized request' });
    })
    .catch((err) => res.status(err.code).json({ message: err.message }));
};
