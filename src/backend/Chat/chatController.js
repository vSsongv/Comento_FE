const asyncHandler = require("../config/asyncHandler");
const errorResponse = require("../config/errorResponse");
const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const chatService = require("./chatService");
const menteeService = require("../Mentee/menteeService");
const regNumber = /^[0-9]/;
const chat = {
    getRoom : asyncHandler( async function(req, res, next){
        const userIdx = req.user.validToken.userid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400))

        // const mentoringId = req.query.mentoringid;
        // if(!mentoringid) return next(new errorResponse(basicResponse(detailResponse.EMPTY_MENTORINGID)));

        // const mentoringState = await chatService.checkMentoring(mentoringId);
        // if(!mentoringState) return next(new errorResponse(basicResponse(detailResponse.NONE_MENTORING)));

        const roomList = await chatService.getRoom(userIdx);
        if(!roomList) next(new errorResponse(responseDetail.NONE_ROOM));
        const questionContent = await menteeService.getAllQuestion(userIdx);
        return res.send(resultResponse(detailResponse.GET_CHAT, questionContent));
    }),
    postChat: asyncHandler( async function(req, res, next){
        const userIdx = req.user.validToken.userid;
        const roomid = req.params.roomid;
        const nickname = req.user.validToken.nickname;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400))

        const content = req.body.content;
        if(!content) return next(new errorResponse(basicResponse(detailResponse.EMPTY_MESSAGE), 400))

        const roomCheck = await chatService.getRoomNumber(roomid);
        if(!roomCheck) return next(new errorResponse(basicResponse(detailResponse.EMPTY_ROOM)));
        await chatService.postChat(nickname, content, roomid);
        let data = {};
        data.nickname = nickname;
        data.content =  content;
        return res.send(resultResponse(detailResponse.POST_MSG,data));
    })

}

module.exports = chat;