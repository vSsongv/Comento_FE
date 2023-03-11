const errorResponse = require("../config/errorResponse");
const responseDetail = require("../config/responseDetail");
const jwt = require("../config/token");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
  checkToken: async (req, res, next) => {
    const accessToken = req.query.token || req.headers["x-access-token"];
    if (!accessToken)
      return next(new errorResponse(responseDetail.NOT_LOGGEDIN, 400));

    // accessToken이 유효한지 먼저 검사
    // 존재하지 않는 경우 -> NOT_LOGGEDIN
    // 유효한 경우 -> 다음 미들웨어로 진행
    // 유효하지 않은 경우 -> client에 response 보내기

    const accessResult = await jwt.verifyToken(accessToken);
    if (accessResult.result === TOKEN_INVALID)
      return next(new errorResponse(responseDetail.NOT_LOGGEDIN, 400));

    if (accessResult.result === TOKEN_EXPIRED)
      return next(new errorResponse(responseDetail.TOKEN_EXPIRED, 400));
    else {
      req.user = accessResult.validToken;
      next();
    }
  },
  checkMento: async (req, res, next) => {
    const userInfo = req.user;
    if (userInfo.role !== "A")
      return next(new errorResponse(responseDetail.NOT_MENTO));
    next();
  },
  checkMentee: async (req, res, next) => {
    const userInfo = req.user;
    if (userInfo.role !== "Q")
      return next(new errorResponse(responseDetail.NOT_MENTEE));
    next();
  },
};

module.exports = authUtil;
