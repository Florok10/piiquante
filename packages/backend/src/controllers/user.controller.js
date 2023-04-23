const service = require('../services/user.service.js');

const signupHandler = async (req, res) => {
  const { email, password } = req.body;
  service
    .signup(email, password)
    .then((result) => res.status(result.code).json({ message: result.message }))
    .catch((err) => res.status(err.code).json({ message: err.message }));
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  service
    .login(email, password)
    .then((result) => res.status(result.code).json(result.user))
    .catch((err) => res.status(err.code).json({ message: err.message }));
};

module.exports = {
  signupHandler,
  loginHandler,
};
