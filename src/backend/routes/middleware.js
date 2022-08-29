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