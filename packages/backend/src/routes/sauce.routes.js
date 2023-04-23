const { Router } = require('express');
const router = Router();
const controller = require('../controllers/sauce.controller.js');
const auth = require('../middlewares/auth.js');
const upload = require('../middlewares/upload.js');
const isIdValid = require('../middlewares/isIdValid.js');
const isSauceValid = require('../middlewares/isSauceValid.js');

router.post(
  '/',
  auth,
  upload.single('image'),
  isSauceValid,
  controller.createHandler
);
router.get('/', controller.getAllHandler);
router.get('/:id', isIdValid, controller.getHandler);
router.put(
  '/:id',
  auth,
  isIdValid,
  upload.single('image'),
  controller.updateHandler
);
router.delete('/:id', auth, isIdValid, controller.removeHandler);
router.post('/:id/like', auth, isIdValid, controller.likeHandler);

module.exports = router;
