const express = require('express');
const router = express.Router();
const userController = require('./userController');
const { checkToken } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// router.post("/profile", checkToken, upload.array("images"), function(req,res,err) {console.log(req.nickname);res.send("hi")}); 업로드 테스트용
router.get('/test', checkToken, function(req,res,err){
    res.send("hi");
})

router.post('/signup',  upload.array("images"), userController.signup); 
router.post('/signin',  userController.signin);
router.post('/reset-password', userController.resetPassword);
router.get('/check/email', userController.checkId);
router.get('/check/phone', userController.checkPhone);
router.get('/check/nickname', userController.checkNickname);

router.post("/find/password", userController.findPassword);
//router.get('/logout', checkAuth, authController.logout);
//router.get('/renewal-token', authController.renewalToken);
//router.get('/signin',  authController.autosignin);
module.exports = router;
