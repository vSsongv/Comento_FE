const jwt = require('../modules/token');
const CODE = require('../modules/statusCode');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkToken: async (req, res, next) => {
        var token = req.headers.token;
        if (!token)
            return res.json({ statusCode: CODE.FAIL, msg: "no token"});

        const user = await jwt.verify(token);
        if (user === TOKEN_EXPIRED)
            return res.json({ statusCode: CODE.UNAUTHORIZED, msg: "token expired"});
        if (user === TOKEN_INVALID)
            return res.json({ statusCode: CODE.INVALID_TOKEN, msg: "invalid token"});
        if (user.idx === undefined)
            return res.json({ statusCode: CODE.INVALID_TOKEN, msg: "invalid token"});
        req.userid = user.userid;
        next();
    }
}

module.exports = authUtil;