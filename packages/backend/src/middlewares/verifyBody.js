module.exports = (req, res, next) => {
  if (!Object.entries(req.body).length) {
    return res
      .status(400)
      .json({ message: 'The body of the request is empty' });
  }
  next();
};
