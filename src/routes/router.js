const { Router } = require('express');
const userRouter = require('./user.routes');

const router = Router();

router.use('/auth', userRouter);

module.exports = router;
