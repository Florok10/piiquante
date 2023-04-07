const { Router } = require('express');
const router = Router();
const controller = require('../controllers/user.controller.js');

// router.post('/', controller.registerUserHandler);

// router.get('/', controller.getUsersHandler);

// router.get('/:id', controller.getUserHandler);

// router.put('/:id', controller.updateUserHandler);

// router.delete('/:id', controller.deleteUserHandler);

router.post('/signup', controller.signupHandler);
router.post('/login', controller.loginHandler);

module.exports = router;