const express = require('express');
const router = express.Router();
const mentoController = require('./mentoController');
const { checkToken, checkMento } = require('../middlewares/auth');


router.get('/test', checkToken, checkMento , (req,res) => {
    res.send("하하");
});

//멘토링 연결
router.post('/connect', checkToken, checkMento, mentoController.connectMentoring);

//진행전(language별로 가져옴, language가 undefined라면 전체 언어에 대한 질문 가져옴), 진행중, 완료 질문들 각각 가져옴
router.get('/question/:status', checkToken, checkMento, mentoController.getQuestionList);
router.get('/question/:status/:language', checkToken, checkMento, mentoController.getQuestionList);


module.exports = router;