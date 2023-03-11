const express = require("express");
const router = express.Router();
const userController = require("./userController");
const { checkToken, checkMentee } = require("../middlewares/auth");
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

// 멘토링 권한 요청 이메일 전송 (DB에 실질적으로 값이 바뀌는 건 없음.)
router.post("/email", checkToken, checkMentee, userController.authRequestEmail);

// user/update/password

router.patch("/update/password", checkToken, userController.updatePassword);
router.patch("/update/nickname", checkToken, userController.updateNickname);
router.patch(
  "/update/profile",
  checkToken,
  upload.single(["images"]),
  userController.updateProfile
);

router.patch("/mentoauth", checkToken, userController.updateMentoRole);

module.exports = router;
