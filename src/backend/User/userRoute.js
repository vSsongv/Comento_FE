const express = require("express");
const router = express.Router();
const userController = require("./userController");
const { checkToken } = require("../middlewares/auth");
const { upload } = require("../config/s3");
const refresh = require("../middlewares/refresh");

router.get("/test", checkToken, function (req, res, err) {
  res.send(req.user);
});
router.get("/userInfo", checkToken, userController.getUserInfo);
router.get("/check/email", userController.checkId);
router.get("/check/phone", userController.checkPhone);
router.get("/check/nickname", userController.checkNickname);
router.get("/refresh", refresh);
router.post("/signup", upload.single(["images"]), userController.signup);
router.post("/signin", userController.signin);
router.post("/reset-password", userController.resetPassword);
router.post("/find/password", userController.findPassword);

router.patch("/update/password", checkToken, userController.updatePassword);
router.patch("/update/nickname", checkToken, userController.updateNickname);
router.patch(
  "/update/profile",
  checkToken,
  upload.single(["images"]),
  userController.updateProfile
);
router.patch("/mentoauth", checkToken, userController.updateMentoRole);

//router.get('/logout', checkAuth, authController.logout);
//router.get('/renewal-token', authController.renewalToken);
//router.get('/signin',  authController.autosignin);
module.exports = router;
