const asyncHandler = require("../config/asyncHandler");
const errorResponse = require("../config/errorResponse");
const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const chatService = require("./chatService");
const menteeService = require("../Mentee/menteeService");
const socket = require("../socket");
const regNumber = /^[0-9]/;
const chat = {
  getRoom: asyncHandler(async function (req, res, next) {
    const roomid = req.params.roomid;
    const io = req.app.get("io");

    io.socket.join(roomid);

    return res.send("asds");
  }),
  postChat: asyncHandler(async function (req, res, next) {
    console.log("asd", req.url);
    const roomid = req.params.roomid;
    const { nickname, message } = req.body;
    const io = req.app.get("io");
    if (!message)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_MESSAGE), 400)
      );
    io.to(roomid).emit("message", message);
    await chatService.postChat(roomid, nickname, message);

    let data = {};
    data.nickname = nickname;
    data.message = message;
    return res.send(resultResponse(detailResponse.POST_MSG, data));
  }),
};

module.exports = chat;
