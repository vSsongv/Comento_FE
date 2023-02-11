const express = require("express");
const router = express.Router();
const menteeController = require("./menteeController");
const { checkToken } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
// TODO : 질문게시 API에서 checkToken 추가 그리고 사진업로드까지 테스트하기
router.post(
  "/question",
  upload.array("images", 4),
  menteeController.postQuestion
);
router.patch("/modify/question", checkToken, menteeController.modifyQuestion);
router.get("/question", checkToken, menteeController.getQuestion);
router.get("/finish/question", checkToken, menteeController.getFinishQuestion);
router.delete(
  "/question/:questionid",
  checkToken,
  menteeController.deleteQuestion
);
module.exports = router;
