module.exports = (req, res, next) => {
  const sauce = JSON.parse(req.body.sauce);
  if (
    sauce.name.length &&
    sauce.description.length &&
    sauce.mainPepper.length &&
    sauce.manufacturer.length &&
    sauce.heat
  )
    return next();
  res.status(400).json({ message: 'Missing required properties' });
};
