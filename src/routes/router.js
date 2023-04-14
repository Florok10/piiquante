const { Router } = require('express');
const userRouter = require('./user.routes');
const sauceRouter = require('./sauce.routes');
const verifyBody = require('../middlewares/verifyBody');

const router = Router();

router.use('/auth', verifyBody, userRouter);
router.use('/sauces', sauceRouter);

module.exports = router;
