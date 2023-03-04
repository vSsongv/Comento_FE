const mentoService = require('./mentoService');
const {basicResponse, resultResponse}  = require('../config/response');
const detailResponse = require('../config/responseDetail');
const asyncHandler = require('../config/asyncHandler');
const errorResponse = require('../config/errorResponse');
const regNumber = /^[0-9]/;
const mento = {
    connectMentoring : asyncHandler(async function(req, res, next){ //이건 한번 다시 봐야됨 내가 짠건 아니지만..
        const userIdx = req.user.userid;
        const mentoringid = req.body.mentoringid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));
        const status = await mentoService.checkMentoring(mentoringid);
        if(status.status === 'I' || status.status === 'F') return next(new errorResponse(basicResponse(detailResponse.ALREADY_MENTROING_QUESTION), 400));
        
        await mentoService.connectMentoring(userIdx, mentoringid);

        return res.send(basicResponse(detailResponse.CONNECT_MENTORING))
    }),
    getQuestionList : asyncHandler(async function(req, res, next){
        const userIdx = req.user.userid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));

        const status = req.params.status;
        if(status === "N"){ //진행전인 질문
            const language = req.params.language;
            if(parseInt(language) === 0 || !language) {
                question = await mentoService.getAllQuestion(userIdx);
            }
            else question = await mentoService.getSpecificQuestion(language, userIdx);
            if(!question[0]) return next(new errorResponse(basicResponse(detailResponse.NO_QUESTION)))
        
            return res.send(resultResponse(detailResponse.GET_QUESTION, question));

        }else if(status === "I" || status === "F"){ //진행 중이거나 진행 종료인 질문
            const list = await mentoService.getQuestionList(status, userIdx)
            if(!list[0]) return next(new errorResponse(basicResponse(detailResponse.NO_QUESTION)));

            return res.send(resultResponse(detailResponse.GET_QUESTION, list))
        }

        return next(new errorResponse(basicResponse(detailResponse.BAD_STATUS_URI)));
    }),
};

module.exports = mento;