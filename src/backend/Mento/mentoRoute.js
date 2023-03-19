const express = require("express");
const router = express.Router();
const mentoController = require("./mentoController");
const { checkToken, checkMento } = require("../middlewares/auth");

router.get("/test", checkToken, checkMento, (req, res) => {
  res.send("하하");
});

//멘토링 연결
router.post(
  "/connect",
  checkToken,
  checkMento,
  mentoController.connectMentoring
);

//진행전, 진행중, 완료 질문들 language별로 각각 가져옴 -> (왼쪽 질문 목록 page)
router.get(
  "/question",
  checkToken,
  checkMento,
  mentoController.getQuestionList
);
//각 질문에 대한 세부사항 가져옴 -> (오른쪽 질문 상세 page)
router.get(
  "/question/:mentoringid",
  checkToken,
  checkMento,
  mentoController.getQuestion
);
//질문 상태별로 질문 개수 가져옴 -> (페이지 위쪽 질문 개수 page)
router.get(
  "/count",
  checkToken,
  checkMento,
  mentoController.CountQuestionNum
);

module.exports = router;
