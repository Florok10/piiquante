const service = require('../services/user.service.js');

const signupHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await service.signup(email, password);
    res.status(result.code).json({ message: result.message });
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await service.login(email, password);
    res.status(result.code).json(result.user);
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  signupHandler,
  loginHandler,
};
