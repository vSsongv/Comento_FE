const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const router = express.Router();
const authController = require('../controller/authController');


router.post('/signup', isNotLoggedIn, authController.signup); 

router.post('/signin', isNotLoggedIn, authController.signin);

router.get('/logout', isLoggedIn, authController.logout);

router.post('/reset-password', authController.resetPassword);

module.exports = router;
