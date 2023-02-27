const asyncHandler = require("../config/asyncHandler");
const errorResponse = require("../config/errorResponse");
const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const surveyService = require("./surveyService");
const regNumber = /^[0-9]/;

const survey = {
    postSurvey : asyncHandler( async function(req, res, next){
        const userIdx = req.user.userid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));

        const {question1, question2, question3, evalutionText} = req.body;
        if(!question1 || !question2 || !question3) return next(new errorResponse(basicResponse(detailResponse.EMPTY_CHECKING), 400));
        if(!evalutionText) return next(new errorResponse(basicResponse(detailResponse.EMPTY_ANSWER), 400));

        const checkSurvey = await surveyService.checkSurvey(userIdx);
        if(checkSurvey) return next(new errorResponse(basicResponse(detailResponse.ALREADY_SURVEY), 400));

        await surveyService.postSurvey(
            userIdx,
            question1,
            question2,
            question3,
            evalutionText
        );
        return res.send(basicResponse(detailResponse.POST_SURVEY));
    })
}

module.exports = survey;