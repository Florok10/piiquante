const { Router } = require('express');
const router = Router();
const controller = require('../controllers/user.controller.js');

router.post('/signup', controller.signupHandler);
router.post('/login', controller.loginHandler);

module.exports = router;
