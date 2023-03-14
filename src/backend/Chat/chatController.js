const asyncHandler = require("../config/asyncHandler");
const errorResponse = require("../config/errorResponse");
const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const chatService = require("./chatService");
const userService = require("../User/userService");

const chat = {
  getRoom: asyncHandler(async function (req, res, next) {
    const roomid = req.params.roomid;
    const role = req.role;
    let partnerInfo, userid;
    if (role == "Q") {
      partnerInfo = await chatService.getMentoInfo(roomid);
      userid = partnerInfo.mentoid;
    } else {
      partnerInfo = await chatService.getMenteeInfo(roomid);
      userid = partnerInfo.menteeid;
    }
    const userInfo = await userService.getUserInfo(userid);

    let data = userInfo.image;
    let result = await chatService.getChatByRoomId(roomid);
    if (result.length == 0) result = [];
    return res.send(
      resultResponse(detailResponse.GET_CHAT, { image: data, chat: result })
    );
  }),
  postChat: asyncHandler(async function (req, res, next) {
    const roomid = req.params.roomid;
    const { nickname, message } = req.body;
    const io = req.app.get("io");
    if (!message)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_MESSAGE), 400)
      );
    await chatService.postChat(roomid, nickname, message);
    const chatInfo = await chatService.getChatInfo(roomid, nickname, message);
    let data = {
      nickname,
      message,
      createdAt: chatInfo.createdAt.toLocaleString("en-US", {
        timeZone: "Asia/Seoul",
      }),
      chatid: chatInfo.chatid,
    };
    io.to(roomid).emit("message", data);
    return res.send(basicResponse(detailResponse.POST_MSG));
  }),
  postImage: asyncHandler(async function (req, res, next) {
    const nickname = req.body.data;
    const roomid = req.params.roomid;
    let image = req.file ? req.file.key : null;
    const io = req.app.get("io");
    if (!image)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_IMAGE), 400)
      );
    if (!nickname)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_NICKNAME), 400)
      );

    await chatService.postChatImage(roomid, nickname, image);
    const chatInfo = await chatService.getChatInfo(roomid, nickname, image);
    let data = {
      nickname,
      image,
      createdAt: chatInfo.createdAt.toLocaleString("en-US", {
        timeZone: "Asia/Seoul",
      }),
      chatid: chatInfo.chatid,
    };
    io.to(roomid).emit("image", data);

    return res.send(basicResponse(detailResponse.POST_MSG));
  }),
};

module.exports = chat;
