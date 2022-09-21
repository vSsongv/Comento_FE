const { off } = require("process");
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    console.log(req.cookies.accessToken);
    if(req.cookies.accessToken){
        next();
    } else{
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if((req.headers.authorization) == null){
        next();
    }else{
        const message = encodeURIComponent('로그인 된 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

exports.verifyToken = async (req, res, next) => {
    if(req.headers.authorization){
        try{
            console.log(req.headers.authorization);
            const validToken = await jwt.verify(req.headers.authorization,  process.env.ACCESS_SECRET);
            console.log(validToken);
            next();
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
    }else{
        res.status(401).json({error: 'Auth Error from authChecker'});
    }
}