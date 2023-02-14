const errorResponse = require('../config/errorResponse');
const responseDetail = require('../config/responseDetail');
const jwt = require('../config/token');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkToken: async (req, res, next) => {
        const token = req.query.token || req.headers["x-access-token"];
        if (!token) return next(new errorResponse(responseDetail.NOT_LOGGEDIN));

        const user = await jwt.verifyToken(token);
        if (user.result === TOKEN_EXPIRED ||  user.result === TOKEN_INVALID || !(user.validToken) )
        return next(new errorResponse(responseDetail.NOT_LOGGEDIN));
        req.user = user.validToken;
        next();
    },
    checkMento : async (req, res, next) => {
        const userInfo = req.user.validToken;
        console.log(userInfo);
        if(userInfo.role === 'Q') return next(new errorResponse(responseDetail.NOT_MENTO));
        next();
    }
};

module.exports = authUtil;