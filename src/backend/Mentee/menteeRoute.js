const express = require('express');
const router = express.Router();
const menteeController = require('./menteeController');
const { checkToken } = require('../middlewares/auth');


router.post('/question', checkToken, menteeController.postQuestion)
router.patch('/modify/question', checkToken, menteeController.modifyQuestion);
router.get('/question', checkToken, menteeController.getQuestion);
router.get('/finish/question', checkToken, menteeController.getFinishQuestion)
router.delete('/question/:questionid', checkToken, menteeController.deleteQuestion);
module.exports = router;