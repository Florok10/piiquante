const { Router } = require('express');
const userRouter = require('./user.routes');
const sauceRouter = require('./sauce.routes');

const router = Router();

router.use('/auth', userRouter);
router.use('/sauces', sauceRouter);

module.exports = router;
