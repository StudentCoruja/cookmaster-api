const express = require('express');

const authController = require('../controller/auth.controller');

const router = express.Router();

router.post('/', authController.login);
router.get('/github', authController.loginWithGitHub);
router.get('/github/callback', authController.callback);

module.exports = router;
