const express = require('express');
const router = express.Router();
const mentoController = require('./mentoController');
const { checkToken, checkMento } = require('../middlewares/auth');


router.get('/test', checkToken, checkMento , (req,res) => {
    res.send("하하");
});

//특정언어 관련 질문 받아오기(아직 멘토링 연결 안된 것들만), language가 undefined라면은 모든 질문 다 가져옴.
router.get('/question/:language', checkToken, checkMento, mentoController.getQuestionList);

//멘토링 연결
router.post('/connect', checkToken, checkMento, mentoController.connectMentoring);

//멘토가 진행중인 질문들 가져오기
router.get('/mentoring/question', checkToken, checkMento, mentoController.getMentoringList);
module.exports = router;