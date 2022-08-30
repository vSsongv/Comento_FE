const { off } = require("process");
const jwt = require('jsonwebtoken');
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(403).sned('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = encodeURIComponent('로그인 된 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

exports.verifyToken = (req, res, next) => {
    try{
        req.data.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch(error){
        if(error.name === 'TokenExpiredError'){
            return res.status(419).json({
                code: 419,
                message: 'token expired',
            });
        }
        return res.status(401).json({
            code: 401,
            message: 'unvalid token',
        });
    }
}