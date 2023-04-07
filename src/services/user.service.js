const {
  UserPasswordValidationError,
  UserDuplicateError,
} = require('../errors/user.error');
const { UserNotFoundError } = require('../errors/user.error');
const User = require('../models/user.model');

const passwordReg = RegExp(
  '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]+$'
);

const checkIfEmailIsRegistered = async (email, id) => {
  const filter = !id
    ? { email }
    : {
        email,
        _id: {
          $ne: id,
        },
      };
  const userWithEmail = await User.findOne(filter);
  if (userWithEmail) throw new UserDuplicateError();
};

const checkIfPasswordMatchesRules = (password) => {
  if (!(password.length < 8 && passwordReg.test(password)))
    throw new UserPasswordValidationError();
};

const register = async (email, password) => {
  const user = { email, password };

  try {
    checkIfPasswordMatchesRules(password);
    await checkIfEmailIsRegistered(email);
    await User.save(user);
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  try {
    return await User.find();
  } catch (err) {
    throw new Error(err);
  }
};

const get = async (id) => {
  try {
    const user = User.findById(id).catch(() => null);
    if (!user) throw new UserNotFoundError();
  } catch (err) {
    throw err;
  }
};

const update = async (update) => {
  const { email, _id, password } = update;
  try {
    const user = User.findById(_id).catch(() => null);
    if (!user) throw new UserNotFoundError();
    await checkIfEmailIsRegistered(email, _id);
    checkIfPasswordMatchesRules(password);
    user.email = email;
    user.password = password;
    await user.save();
  } catch (err) {
    throw err;
  }
};

const remove = async (_id) => {
  try {
    await User.findByIdAndDelete(_id);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { register, getAll, get, update, remove };
