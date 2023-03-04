const menteeService = require("./menteeService");
const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const asyncHandler = require("../config/asyncHandler");
const errorResponse = require("../config/errorResponse");
const secret = require("../config/secret");
const { s3, deleteFile } = require("../config/s3");
const regNumber = /^[0-9]/;

const mentee = {
  postQuestion: asyncHandler(async function (req, res, next) {
    const files = req.files;
    try {
      let fileList = [];
      if (files.length > 0) {
        for (let object of files) {
          fileList.push(object.key);
        }
      }
      fileList = { ...fileList };
      const { language, title, content } = JSON.parse(req.body.data);
      const { userid, nickname } = req.user;
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
        fileList
      );
      let newRoom = await menteeService.createRoom(userIdx);
      newRoom = newRoom.dataValues.roomid;
      await menteeService.createChat(nickname, content);
      return res.send(resultResponse(detailResponse.POST_QUESTION, newRoom)); //response받음과 동시에 `/room/${newRoom}` 으로 redirect시키기
    } catch (error) {
      let fileArray = [];
      files.forEach((obj) => {
        let file = {
          Key: `${obj.key}`,
        };
        fileArray.push(file);
      });
      const params = {
        Bucket: secret.bucket,
        Delete: {
          Objects: fileArray,
          Quiet: false,
        },
      };
      deleteFile(params);
      //TODO: detailResponse재정의
      return next(
        new errorResponse(basicResponse(detailResponse.EXIST_QUESTION), 400)
      );
    }
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
  getSpecificQuestion: asyncHandler(async function (req, res, next) {
    const questionid = req.params.questionid;
    const userIdx = req.user.userid;
    if (!questionid)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_QUESTIONID), 400)
      );
    if (!userIdx)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400)
      );
    const questionInfo = await menteeService.getSpecificQuestion(questionid);
    if (!questionInfo)
      return next(
        new errorResponse(basicResponse(detailResponse.NOT_EXIST_QUESTION), 400)
      );
    return res.send(
      resultResponse(detailResponse.GET_QUESTIONINFO, questionInfo)
    );
  }),
  modifyQuestion: asyncHandler(async function (req, res, next) {
    const files = req.files;
    try {
      const userIdx = req.user.userid;
      const nickname = req.user.nickname;
      const { questionid, title, content, language, deleteList } = JSON.parse(
        req.body.data
      );
      let keys = Object.keys(deleteList);

      let fileList = [];
      if (files.length > 0) {
        for (let object of files) {
          fileList.push(object.key);
        }
      }
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
      const question = await menteeService.getSpecificQuestion(questionid);
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
      keys.forEach((obj) => {
        delete question.content_image[obj];
      });

      const image = { ...question.content_image, ...fileList };
      await menteeService.modifyQuestion(
        questionid,
        title,
        content,
        language,
        image
      );
      await menteeService.modifyChat(
        nickname,
        questionid,
        content,
        title,
        language
      );
      let fileArray = [];
      keys.forEach((key) => {
        fileArray.push({ Key: deleteList[key] });
      });
      console.log(fileArray);
      const params = {
        Bucket: secret.bucket,
        Delete: {
          Objects: fileArray,
          Quiet: false,
        },
      };
      deleteFile(params);
      return res.send(basicResponse(detailResponse.MODIFY_SUCCESS));
    } catch (error) {
      let fileArray = [];
      files.forEach((obj) => {
        let file = {
          Key: `${obj.key}`,
        };
        fileArray.push(file);
      });
      const params = {
        Bucket: secret.bucket,
        Delete: {
          Objects: fileArray,
          Quiet: false,
        },
      };
      deleteFile(params);
      //TODO: detailResponse재정의
      return next(
        new errorResponse(basicResponse(detailResponse.EXIST_QUESTION), 400)
      );
    }
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
    await menteeService.deleteChat(questionid);
    await menteeService.deleteRoom(questionid);
    let keys = Object.keys(isQuestion.content_image);
    let fileArray = [];
    keys.forEach((key) => {
      fileArray.push({ Key: isQuestion.content_image[key] });
    });

    const params = {
      Bucket: secret.bucket,
      Delete: {
        Objects: fileArray,
        Quiet: false,
      },
    };
    deleteFile(params);
    return res.send(basicResponse(detailResponse.DELETE_QUESTION));
  }),
};

module.exports = mentee;
