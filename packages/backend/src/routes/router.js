const { Router } = require('express');
const userRouter = require('./user.routes');
const sauceRouter = require('./sauce.routes');
const verifyBody = require('../middlewares/verifyBody');
const rateLimit = require('express-rate-limit');

const router = Router();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message:
    'Too many attempts to signup/signin from this IP, please try again after an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.use('/auth', limiter, verifyBody, userRouter);
router.use('/sauces', sauceRouter);

module.exports = router;
