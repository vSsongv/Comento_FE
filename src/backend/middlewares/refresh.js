const { basicResponse, resultResponse } = require("../config/response");
const errorResponse = require('../config/errorResponse');
const responseDetail = require('../config/responseDetail');
const { User } = require("../models/index");
const { logger } = require("../config/winston");
const dotenv = require("dotenv");
dotenv.config();
const JWT = require("jsonwebtoken");
const jwt = require("../config/token");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const refresh = async (req, res, next) => {
    const accessToken = req.query.token || req.headers["x-access-token"];
    const useridx = req.headers["useridx"];
    if(!accessToken) return next(new errorResponse(responseDetail.NOT_LOGGEDIN));
    if(!useridx) return next(new errorResponse(responseDetail.NOT_LOGGEDIN));

    const userInfo = await JWT.decode(accessToken, process.env.ACCESS_SECRET);
    if(useridx != userInfo.userid) return next(new errorResponse(responseDetail.NOT_LOGGEDIN));

    // DB에서 refresh Token 꺼내와서 refresh Token 유효한지 확인
    // refresh Token이 없다면? -> NOT_LOGGEDIN
    // refresh Token이 유효하지 않다면? -> 재로그인
    // refresh Token이 유효한다면? -> accessToken 재발급

    let refreshToken;
    try{
        refreshToken = await User.findOne({
            attributes: ["refreshToken"],
            where: {
            userid : useridx,
            },
        });
    }catch(error){
        logger.error(`${error.message}`);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }

    if(!refreshToken) return next(new errorResponse(responseDetail.NOT_LOGGEDIN));

    const refreshResult = await jwt.verifyToken(refreshToken);
    if(refreshResult.result === TOKEN_INVALID) return next(new errorResponse(responseDetail.NOT_LOGGEDIN));
    if(refreshResult.result === TOKEN_EXPIRED || !(refreshResult.validToken))
        return next(new errorResponse(responseDetail.RE_LOGIN));

    const newAccessToken = await jwt.sign(userInfo, 0, "15m");
    return res.send(resultResponse(detailResponse.REFRESH_SUCCESS, {accessToken : newAccessToken}));
}

module.exports = refresh;