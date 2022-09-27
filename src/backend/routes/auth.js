const express = require('express');
const checkAuth = require('../middlewares/auth').checkToken;
const router = express.Router();
const authController = require('../controller/authController');


router.post('/signup',  authController.signup); 


router.get('/signin',  authController.autosignin);

router.post('/signin',  authController.signin);


router.get('/logout', checkAuth, authController.logout);

router.post('/reset-password', authController.resetPassword);

router.get('/renewal-token', authController.renewalToken);
module.exports = router;
