const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  if (mongoose.isValidObjectId(req.params.id)) next();
  else res.status(400).json({ message: 'The id parameter is not valid' });
};
