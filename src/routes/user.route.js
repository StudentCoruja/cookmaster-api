const express = require('express');

const userController = require('../controller/user.controller');
const validateUser = require('../middlewares/validate.user');

const router = express.Router();

router.get('/', userController.findAllUsers);
router.get('/:id', userController.findUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
