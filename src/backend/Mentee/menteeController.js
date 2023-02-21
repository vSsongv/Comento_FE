const menteeService = require("./menteeService");
const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const asyncHandler = require("../config/asyncHandler");
const errorResponse = require("../config/errorResponse");
const regNumber = /^[0-9]/;

const mentee = {
  postQuestion: asyncHandler(async function (req, res, next) {
    let imageDir = {};
    for (let i = 0; i < req.files.length; i++) {
      imageDir[i + 1] = req.files[i]["path"];
    }
    const { language, title, userid, nickname, content } = JSON.parse(
      req.body.data
    );

    const userIdx = userid;
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

    if (!language)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_LANGUAGE), 400)
      );

    if (!title)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_TITLE), 400)
      );

    if (!content)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_CONTENT), 400)
      );

    const dupTitle = await menteeService.checkTitle(userIdx, title);
    const dupContent = await menteeService.checkContent(userIdx, content);

    if (dupTitle || dupContent)
      return next(
        new errorResponse(basicResponse(detailResponse.EXIST_QUESTION), 400)
      );

    await menteeService.postQuestion(
      userIdx,
      language,
      title,
      content,
      imageDir
    );
    let newRoom = await menteeService.createRoom(userIdx);
    newRoom = newRoom.dataValues.roomid;
    await menteeService.createChat(nickname, content);
    return res.send(resultResponse(detailResponse.POST_QUESTION, newRoom)); //response받음과 동시에 `/room/${newRoom}` 으로 redirect시키기
  }),
  getQuestion: asyncHandler(async function (req, res, next) {
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

    const question = await menteeService.getUnderwayQuestion(userIdx);

    if (!question)
      return next(
        new errorResponse(basicResponse(detailResponse.NONE_QUESTION), 400)
      );
    return res.send(resultResponse(detailResponse.GET_QUESTION, question));
  }),
  getFinishQuestion: asyncHandler(async function (req, res, next) {
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

    const question = await menteeService.getFinishedQuestion(userIdx);

    if (!question)
      return next(
        new errorResponse(basicResponse(detailResponse.NONE_QUESTION), 400)
      );
    return res.send(resultResponse(detailResponse.GET_QUESTION, question));
  }),
  modifyQuestion: asyncHandler(async function (req, res, next) {
    const userIdx = req.user.userid;
    const { questionid, title, content, language } = req.body;
    if (!questionid)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_QUESTIONID))
      );

    if (!(title && content && language))
      return next(new errorResponse(basicResponse(detailResponse.NO_MODIFY)));

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

    const question = await menteeService.getSpecificQuestion(
      userIdx,
      questionid
    );
    if (!question)
      return next(
        new errorResponse(basicResponse(detailResponse.NONE_QUESTION))
      );
    if (question.mentoId)
      return next(
        new errorResponse(
          basicResponse(detailResponse.CUREENT_MENTORINGMODE),
          400
        )
      );
    await menteeService.modifyQuestion(questionid, title, content, language);
    await menteeService.modifyChat(
      userIdx,
      questionid,
      content,
      title,
      language
    );
    return res.send(basicResponse(detailResponse.MODIFY_SUCCESS));
  }),
  deleteQuestion: asyncHandler(async function (req, res, next) {
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

    const { questionid } = req.params;
    if (!questionid)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_QUESTIONID))
      );

    const isQuestion = await menteeService.getSpecificQuestion(
      userIdx,
      questionid
    );
    if (!isQuestion)
      return next(
        new errorResponse(basicResponse(detailResponse.NONE_QUESTION))
      );
    if (isQuestion.mentoId)
      return next(
        new errorResponse(
          basicResponse(detailResponse.CUREENT_MENTORINGMODE),
          400
        )
      );

    await menteeService.deleteQuestion(questionid);
    await menteeService.deleteChat(userIdx, questionid);
    await menteeService.deleteRoom(questionid);
    return res.send(basicResponse(detailResponse.DELETE_QUESTION));
  }),
};

module.exports = mentee;
