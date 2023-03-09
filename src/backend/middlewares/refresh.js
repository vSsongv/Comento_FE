const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const errorResponse = require("../config/errorResponse");
const responseDetail = require("../config/responseDetail");
const userService = require("../User/userService");
const dotenv = require("dotenv");
dotenv.config();
const JWT = require("jsonwebtoken");
const jwt = require("../config/token");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const refresh = async (req, res, next) => {
  const refreshToken = req.query.token || req.headers["x-access-token"];
  if (!refreshToken)
    return next(new errorResponse(responseDetail.NOT_LOGGEDIN));

  const refreshResult = await jwt.verifyToken(
    refreshToken,
    process.env.REFRESH_SECRET
  );
  if (refreshResult.result === TOKEN_INVALID)
    return next(new errorResponse(responseDetail.NOT_LOGGEDIN));

  if (refreshResult.result === TOKEN_EXPIRED)
    return next(new errorResponse(responseDetail.TOKEN_EXPIRED));

  const userid = refreshResult.validToken.userid;

  const temp = await userService.getToken(userid);
  const DB_token = temp.refreshToken;
  if (!DB_token || DB_token != refreshToken)
    return next(new errorResponse(responseDetail.TOKEN_NOT_MATCH));
  const userInfo = await userService.getUserInfo(userid);
  const token = await userService.issueAccessToken(userInfo);
  return res.send(
    resultResponse(detailResponse.REFRESH_SUCCESS, token.accessToken)
  );
};

module.exports = refresh;
