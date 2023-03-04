const express = require('express');
const router = express.Router();
const surveyController = require('./surveyController');
const { checkToken } = require('../middlewares/auth');

router.post('/', checkToken, surveyController.postSurvey);

module.exports = router;
