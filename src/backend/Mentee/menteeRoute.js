const express = require("express");
const router = express.Router();
const menteeController = require("./menteeController");
const { checkToken } = require("../middlewares/auth");
const { upload } = require("../config/s3");

// TODO : 질문게시 API에서 checkToken 추가 그리고 사진업로드까지 테스트하기
router.post(
  "/question",
  checkToken,
  upload.array(["images"]),
  menteeController.postQuestion
);
router.get("/question", checkToken, menteeController.getQuestion);
router.get(
  "/question/:questionid",
  checkToken,
  menteeController.getSpecificQuestion
);

//TODO: 멘토링 체결이 되기전인지를 확인하는 과정필요
router.patch(
  "/question",
  checkToken,
  upload.array(["images"]),
  menteeController.modifyQuestion
);

//TODO: 멘토링 체결이 되기전인지를 확인하는 과정필요
router.delete(
  "/question/:questionid",
  checkToken,
  menteeController.deleteQuestion
);
router.get("/finish/question", checkToken, menteeController.getFinishQuestion);

module.exports = router;
