const mentoService = require('./mentoService');
const {basicResponse, resultResponse}  = require('../config/response');
const detailResponse = require('../config/responseDetail');
const asyncHandler = require('../config/asyncHandler');
const errorResponse = require('../config/errorResponse');
const regNumber = /^[0-9]/;
const mento = {
    getQuestionList : asyncHandler(async function(req,res,next){
        const userIdx = req.user.validToken.userid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));

        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));

        let question;
        const {language} = req.params;
        if(parseInt(language) === 0) {
            question = await mentoService.getAllQuestion(userIdx);
        }
        else question = await mentoService.getSpecificQuestion(language, userIdx);
        if(!question) return next(new errorResponse(basicResponse(detailResponse.NO_QUESTION)))
        
        return res.send(resultResponse(detailResponse.GET_QUESTION, question));
    }),
    connectMentoring : asyncHandler(async function(req, res, next){
        const userIdx = req.user.validToken.userid;
        const mentoringid = req.body.mentoringid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));
        const status = await mentoService.checkMentoring(mentoringid);
        if(status.status === 'I' || status.status === 'F') return next(new errorResponse(basicResponse(detailResponse.ALREADY_MENTROING_QUESTION), 400));
        
        await mentoService.connectMentoring(userIdx, mentoringid);

        return res.send(basicResponse(detailResponse.CONNECT_MENTORING))
    }),
    getMentoringList : asyncHandler(async function(req, res, next){
        const userIdx = req.user.validToken.userid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));

        const list = await mentoService.getMentoringList(userIdx)
        if(!list) return next(new errorResponse(basicResponse(detailResponse.NONE_MENTORING)));

        return res.send(resultResponse(detailResponse.UNDERWAY_MENTORING, list))

    })
};

module.exports = mento;