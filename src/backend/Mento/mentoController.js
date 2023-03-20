const mentoService = require("./mentoService");
const userService = require("../User/userService");
const chatService = require("../Chat/chatService");
const { sendMentoringEmail } = require("../config/email");
const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const asyncHandler = require("../config/asyncHandler");
const errorResponse = require("../config/errorResponse");

const regNumber = /^[0-9]/;
const mento = {
  connectMentoring: asyncHandler(async function (req, res, next) {
    const userIdx = req.user.userid;
    const mentoringid = req.query.mentoringid;
    if (!userIdx)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400)
      );
    if (!regNumber.test(userIdx))
      return next(
        new errorResponse(
          basicResponse(detailResponse.TOKEN_VERFICATION_FAIL),
          400
        )
      );
    const mentoringInfo = await mentoService.getMentoringInfo(mentoringid);
    if (mentoringInfo.status === "I" || mentoringInfo.status === "F")
      return next(
        new errorResponse(
          basicResponse(detailResponse.ALREADY_MENTROING_QUESTION),
          400
        )
      );

    const menteeInfo = await userService.getUserInfo(mentoringInfo.menteeid);
    const mentorInfo = await userService.getUserInfo(userIdx);
    await mentoService.connectMentoring(parseInt(mentoringid), userIdx);
    await chatService.createRoom(parseInt(mentoringid), mentoringInfo.menteeid, userIdx);
    let emailData = {
      email : menteeInfo.email,
      mentorNickname: mentorInfo.nickname,
      menteeNickname: menteeInfo.nickname,
      chattingLink:`localhost:3000/chatting/${mentoringid}`
    };
    sendMentoringEmail(emailData);
    return res.send(basicResponse(detailResponse.CONNECT_MENTORING));
  }),
  getQuestionList: asyncHandler(async function (req, res, next) {
    const type = req.query.type;
    const language = req.query.language;
    if (!type || !language)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_PARAM), 400)
      );

    const userIdx = req.user.userid;
    if (!userIdx)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400)
      );
    if (!regNumber.test(userIdx))
      return next(
        new errorResponse(
          basicResponse(detailResponse.TOKEN_VERFICATION_FAIL),
          400
        )
      );

    let question = [],
      status;
    const mentoringType = parseInt(type);
    switch (mentoringType) {
      case 0:
        status = "B";
        break;
      case 1:
        status = "I";
        break;
      case 2:
        status = "F";
        break;
      default:
        return next(
          new errorResponse(
            basicResponse(detailResponse.QUESTION_TYPE_ERROR),
            400
          )
        );
    }
    question =
      mentoringType == 0
        ? await mentoService.getAllQuestionList(language, status)
        : await mentoService.getQuestionList(language, status, userIdx);
    if (question.length == 0)
      return res.send(resultResponse(detailResponse.NONE_MENTORING, []));

    return res.send(resultResponse(detailResponse.GET_QUESTION, question));
  }),
  getQuestion: asyncHandler(async function (req, res, next) {
    const mentoringid = req.params.mentoringid;
    if (!mentoringid)
      return next(
        new errorResponse(basicResponse(detailResponse.BAD_STATUS_URI))
      );

    const userIdx = req.user.userid;
    if (!userIdx)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400)
      );
    if (!regNumber.test(userIdx))
      return next(
        new errorResponse(
          basicResponse(detailResponse.TOKEN_VERFICATION_FAIL),
          400
        )
      );

    const question = await mentoService.getQuestion(mentoringid);
    if (!question)
      return next(new errorResponse(basicResponse(detailResponse.NO_QUESTION)));

    const nickname = await userService.getNickname(question.menteeid);
    delete question.menteeid;
    question.nickname = nickname.nickname;

    return res.send(resultResponse(detailResponse.GET_QUESTION, question));
  }),
};

module.exports = mento;
