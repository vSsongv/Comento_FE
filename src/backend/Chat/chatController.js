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
    const roomId = req.params.roomId;
    let abc;
    const { nickname, message } = req.body;
    const io = req.app.get("io");
    if (!message)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_MESSAGE), 400)
      );
    console.log(message);
    io.to(roomId).emit("message", { message });
    // const roomCheck = await chatService.getRoomNumber(roomId);
    // if (!roomCheck)
    //   return next(new errorResponse(basicResponse(detailResponse.EMPTY_ROOM)));
    await chatService.postChat(roomId, nickname, message);

    let data = {};
    data.nickname = nickname;
    data.message = message;
    return res.send(resultResponse(detailResponse.POST_MSG, data));
  }),
};

module.exports = chat;
