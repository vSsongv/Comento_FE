const express = require("express");
const router = express.Router();
const menteeController = require("./menteeController");
const { checkToken } = require("../middlewares/auth");
const isValidQuestion = require("../middlewares/isValidQuestion");
const { upload } = require("../config/s3");

// TODO : 질문게시 API에서 checkToken 추가 그리고 사진업로드까지 테스트하기
router.post(
  "/question",
  checkToken,
  upload.array(["images"]),
  menteeController.postQuestion
);

router.get("/question", checkToken, menteeController.getQuestion);

router.patch(
  "/question",
  checkToken,
  isValidQuestion,
  upload.array(["images"]),
  menteeController.modifyQuestion
);

router.delete(
  "/question",
  checkToken,
  isValidQuestion,
  menteeController.deleteQuestion
);

router.get(
  "/question/questionInfo",
  checkToken,
  menteeController.getSpecificQuestion
);

module.exports = router;
