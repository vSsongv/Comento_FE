const menteeService = require('./menteeService');
const {basicResponse, resultResponse}  = require('../config/response');
const detailResponse = require('../config/responseDetail');
const asyncHandler = require('../config/asyncHandler');
const errorResponse = require('../config/errorResponse');
const regNumber = /^[0-9]/;


const mentee = {
    postQuestion : asyncHandler(async function(req, res, next){
        const {language, title, content} = req.body; //이미지 나중에 고려
        const userIdx = req.user.validToken.userid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400))

        if(!language) return next(new errorResponse(basicResponse(detailResponse.EMPTY_LANGUAGE), 400));

        if(!title) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TITLE), 400));

        if(!content) return next(new errorResponse(basicResponse(detailResponse.EMPTY_CONTENT), 400));

        const dupTitle = await menteeService.checkTitle(userIdx, title);
        const dupContent = await menteeService.checkContent(userIdx, content);

        if(dupTitle || dupContent) return next(new errorResponse(basicResponse(detailResponse.EXIST_QUESTION), 400));

        await menteeService.postQuestion(userIdx,language, title, content);
        return res.send(basicResponse(detailResponse.POST_QUESTION));
    }),
    getQuestion : asyncHandler(async function(req, res, next){
        const userIdx = req.user.validToken.userid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));

        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400))

        const question = await menteeService.getQuestion(userIdx);

        if(!question) return next(new errorResponse(basicResponse(detailResponse.NONE_QUESTION), 400))
        return res.send(resultResponse(detailResponse.GET_QUESTION, question));
    }),
    modifyQuestion : asyncHandler(async function(req, res, next){

        const userIdx = req.user.validToken.userid;
        const {questionid,title, content, language} = req.body;
        if(!questionid) return next(new errorResponse(basicResponse(detailResponse.EMPTY_QUESTIONID)));

        if(!(title && content && language)) return next(new errorResponse(basicResponse(detailResponse.NO_MODIFY)))

        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));

        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400))

        const question = await menteeService.getSpecificQuestion(userIdx, questionid);
        if(!question) return next(new errorResponse(basicResponse(detailResponse.NONE_QUESTION)))
        if(question.mentoId) return next(new errorResponse(basicResponse(detailResponse.CUREENT_MENTORINGMODE), 400));
        await menteeService.modifyQuestion(questionid, title, content, language);

        return res.send(basicResponse(detailResponse.MODIFY_SUCCESS))
    })
};


module.exports = mentee;