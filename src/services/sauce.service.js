const { InternalError } = require('../errors/errors.js');
const { SauceNotFoundError } = require('../errors/sauce.errors.js');
const Sauce = require('../models/sauce.model.js');

const create = async (sauce) => {
  try {
    await Sauce.create(sauce);
    return { code: 203, message: 'Sauce created successfully !' };
  } catch (err) {
    throw new InternalError(err);
  }
};

const getAll = async () => {
  try {
    return { code: 200, sauces: await Sauce.find() };
  } catch (err) {
    throw new InternalError(err);
  }
};

const get = async (id) => {
  try {
    const sauce = await Sauce.findById(id).catch(() => null);
    if (!sauce) throw new SauceNotFoundError();
    return { code: 200, sauce };
  } catch (err) {
    throw err;
  }
};

const update = async (update) => {
  const { _id, sauceUpdate } = update;
  try {
    const sauce = await Sauce.findById(_id).catch(() => null);
    if (!sauce) throw new SauceNotFoundError();
    await sauce.save(sauceUpdate);
  } catch (err) {
    throw err;
  }
};

const remove = async (_id) => {
  try {
    await Sauce.findByIdAndDelete(_id);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { create, get, getAll, update, remove };
