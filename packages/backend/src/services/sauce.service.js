const mongoose = require('mongoose');
const { InternalError } = require('../errors/errors.js');
const Sauce = require('../models/sauce.model.js');
const fs = require('fs');
const { SauceNotFoundError } = require('../errors/sauce.errors.js');

const create = async (data, protocol, host) => {
  const filename = data.file.filename;
  delete data.file;
  const imageUrl = `${protocol}://${host}/public/images/${filename}`;
  const sauce = new Sauce({
    ...JSON.parse(data.sauce),
    imageUrl,
    userId: data.userId,
  });
  return sauce
    .save()
    .then(() => ({ code: 201, message: 'Created' }))
    .catch((err) => {
      throw new InternalError(err);
    });
};

const getAll = async () =>
  Sauce.find()
    .then((sauces) => ({ code: 200, sauces }))
    .catch((err) => {
      throw new InternalError(err);
    });

const get = async (id) =>
  Sauce.findById(id)
    .then((sauce) => {
      if (sauce === null) throw new SauceNotFoundError();
      return { code: 200, sauce };
    })
    .catch((err) => {
      if (!err.code) throw new InternalError(err);
      throw err;
    });

const handleUnlink = (err) => {
  if (err) throw err;
};

const update = async (update, protocol, host) => {
  const filename = update.file && update.file.filename;
  const parsedUpdate = update.file
    ? {
        ...JSON.parse(update.sauce),
        imageUrl: `${protocol}://${host}/public/images/${filename}`,
        id: update.id,
      }
    : { ...JSON.parse(update.sauce), id: update.id };

  return Sauce.findById(parsedUpdate.id)
    .then(async (sauce) => {
      if (sauce === null) throw new SauceNotFoundError();
      const imagePath = 'src/public/' + sauce.imageUrl.split('public/')[1];
      sauce.name = parsedUpdate.name;
      sauce.description = parsedUpdate.description;
      if (parsedUpdate.imageUrl) sauce.imageUrl = parsedUpdate.imageUrl;
      sauce.mainPepper = parsedUpdate.mainPepper;
      sauce.manufacturer = parsedUpdate.manufacturer;
      sauce.heat = parsedUpdate.heat;
      await sauce.save();

      fs.unlink(imagePath, handleUnlink);
      return { code: 200, message: 'Sauce successfully updated' };
    })
    .catch((err) => {
      if (!err.code) throw new InternalError(err);
      throw err;
    });
};

const remove = async (_id) => {
  return Sauce.findById(_id)
    .then(async (sauce) => {
      if (sauce === null) throw new SauceNotFoundError();
      return Sauce.deleteOne({ _id }).then(async () => {
        const imagePath = 'src/public/' + sauce.imageUrl.split('public/')[1];
        fs.unlink(imagePath, handleUnlink);
        return { code: 200, message: 'Sauce deleted' };
      });
    })
    .catch((err) => {
      if (!err.code) throw new InternalError(err);
      throw err;
    });
};

const like = async (sauceId, userId, like) =>
  Sauce.findById(sauceId)
    .then(async (sauce) => {
      if (sauce === null) throw new SauceNotFoundError();
      switch (like) {
        case -1: {
          sauce.dislikes++;
          sauce.usersDisliked.push(new mongoose.Types.ObjectId(userId));
          break;
        }
        case 0: {
          isDeletingLike = !!sauce.usersLiked.filter(
            (user) => user.toString() === userId
          ).length;
          if (isDeletingLike) {
            sauce.likes--;
            sauce.usersLiked = sauce.usersLiked.filter(
              (user) => user.toString() !== userId
            );
          } else {
            sauce.dislikes--;
            sauce.usersDisliked = sauce.usersDisliked.filter(
              (user) => user.toString() !== userId
            );
          }
          break;
        }
        case 1: {
          sauce.likes++;
          sauce.usersLiked.push(new mongoose.Types.ObjectId(userId));
          break;
        }
      }

      await sauce.save();
      return { code: 200, message: `Sauce ${sauce.name}` };
    })
    .catch((err) => {
      if (!err.code) throw new InternalError(err);
      throw err;
    });

module.exports = { create, get, getAll, update, remove, like };
