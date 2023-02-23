const { access } = require('fs');
const errorResponse = require('../config/errorResponse');
const responseDetail = require('../config/responseDetail');
const jwt = require('../config/token');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkToken: async (req, res, next) => {
        const accessToken = req.query.token || req.headers["x-access-token"];
        if(!accessToken) return next(new errorResponse(responseDetail.NOT_LOGGEDIN));

        // accessToken이 유효한지 먼저 검사
        // 유효한 경우 -> 다음 미들웨어로 진행
        // 유효하지 않은 경우 -> client에 response 보내기

        const accessResult = await jwt.verifyToken(accessToken);
        console.log("access result : ", accessResult.validToken);
        if(accessResult.result === TOKEN_INVALID)
            return next(new errorResponse(responseDetail.NOT_LOGGEDIN));

        if(accessResult.result === TOKEN_EXPIRED || !(accessResult.validToken))
            return next(new errorResponse(responseDetail.TOKEN_EXPIRED));
        else {
            req.user = accessResult.validToken;
            next();
        } 



        /*
        const token = req.query.token || req.headers["x-access-token"];
        if (!token) return next(new errorResponse(responseDetail.NOT_LOGGEDIN));

        const user = await jwt.verifyToken(token);
        if (user.result === TOKEN_EXPIRED ||  user.result === TOKEN_INVALID || !(user.validToken) )
        return next(new errorResponse(responseDetail.NOT_LOGGEDIN));
        req.user = user.validToken;
        next();
        */
    },
    checkMento : async (req, res, next) => {
        const userInfo = req.user.validToken;
        console.log(userInfo);
        if(userInfo.role === 'Q') return next(new errorResponse(responseDetail.NOT_MENTO));
        next();
    }
};

module.exports = authUtil;