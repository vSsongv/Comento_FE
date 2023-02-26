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
router.patch("/question", checkToken, menteeController.modifyQuestion);
router.delete(
  "/question/:questionid",
  checkToken,
  menteeController.deleteQuestion
);
router.get("/finish/question", checkToken, menteeController.getFinishQuestion);

module.exports = router;
