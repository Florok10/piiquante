const {
  UserPasswordValidationError,
  UserDuplicateError,
  UserWrongInformationsError,
  UserEmailValidationError,
} = require('../errors/user.errors');
const { InternalError } = require('../errors/errors');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const passwordReg = /^([a-zA-Z0-9@$!%*#?&]){8,}/;
const emailReg = /^^[\w-.]+@[\w-]+[.]+[\w-]{2,4}$/;

const checkIfEMailMatchesRules = async (email) => {
  if (!emailReg.test(email)) throw new UserEmailValidationError();
};

const checkIfPasswordMatchesRules = async (password) => {
  if (!passwordReg.test(password)) throw new UserPasswordValidationError();
};

const signup = async (email, password) => {
  try {
    const user = new User({ email, password });
    await checkIfEMailMatchesRules(email);
    await checkIfPasswordMatchesRules(password);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save().catch((err) => {
      if (err.errors.email) throw new UserDuplicateError();
      throw err;
    });
    return { code: 201, message: 'User created successfully !' };
  } catch (err) {
    if (!err.code) {
      throw new InternalError(err);
    }
    throw err;
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email }).catch(() => null);
    if (!user) throw new UserWrongInformationsError();
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UserWrongInformationsError();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: '24h',
    });

    return { code: 200, user: { userId: user._id, token } };
  } catch (err) {
    if (!err.code) {
      throw new InternalError(err);
    }
    throw err;
  }
};

module.exports = { signup, login };
