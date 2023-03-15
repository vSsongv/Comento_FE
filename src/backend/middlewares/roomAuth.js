const errorResponse = require("../config/errorResponse");
const responseDetail = require("../config/responseDetail");
const chatService = require("../Chat/chatService");
const result = {
  checkRoomAuth: async (req, res, next) => {
    const roomid = req.params.roomid;
    const userid = req.user.userid;
    const isUserInRoom = await chatService.checkRoomAuth(roomid);
    if (!isUserInRoom.menteeid || !isUserInRoom.mentoid)
      return next(new errorResponse(responseDetail.NOT_MENTORING_READY));

    if (userid == isUserInRoom.menteeid) req.role = "Q";
    else if (userid == isUserInRoom.mentoid) req.role = "A";
    else
      return next(new errorResponse(responseDetail.USER_NOT_EXIST_INROOM, 400));
    next();
  },
};

module.exports = result;
