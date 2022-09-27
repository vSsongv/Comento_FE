const User = require('../models/user');
const { auth, Auth } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const token = require('../modules/token');
const fs = require("fs");
const imageDir = __dirname + '/../user/';
const path = require("path");
const { verifyToken } = require("../modules/token");
const CODE = require('../modules/statusCode');

if(!fs.existsSync(imageDir)) { 
    fs.mkdirSync(imageDir);
}

const member = {
    signup: async (req, res ,next) => {
            try{
                const checkEmail =  await User.findOne({
                    where: {
                        email :req.body.userEmail,
                    }
                });
                const checkNickname = await User.findOne({
                    where: {
                        nickname: req.body.userNickname,
                    }
                });
                if(checkEmail){
                    return res.json({ statusCode: CODE.DUPLICATE, msg: "email that already exists"});
                }
                if(checkNickname){
                    return res.json({ statusCode: CODE.DUPLICATE, msg: "nickname that already exists"});
                }

                const oldpath = req.body.userProfile;
                let newpath;
                if(oldpath){
                    newpath = path.join(imageDir , path.basename(oldpath));
                    console.log(newpath);
                    fs.rename(oldpath, newpath, function(err) {
                        newpath = null;
                    });      
                }else{
                    newpath = null;
                }

                const hashedpw = await bcrypt.hash(req.body.userPassword, 12);
                await User.create({
                    nickname: req.body.userNickname,
                    email : req.body.userEmail,
                    password: hashedpw,
                    image: newpath,
                    cellphone: req.body.userPhoneNum,
                });
                return res.json({ statusCode: CODE.SUCCESS, msg: "create user successfully"});
            } catch(err){
                console.error(err);
                next(err);
            }
    },
    autosignin: (req, res, next) => {
        const verifyResult = token.verifyToken(req.cookies.accessToken);
        if(verifyResult.result == 1){
            return res.json({ statusCode: CODE.SUCCESS, msg: "auto-signin success", decodedInfo: verifyResult});
        }else{
            return res.json({ statusCode: CODE.FAIL, msg: "auto-signin fail"});
        }
    },
    signin : async (req, res, next) => {
        try{        
            const userpassword = req.body.userPassword;
            const userInfo = await User.findOne({
                where :{
                    email : req.body.userEmail
                }
            }); // 해당 이메일 사용자 찾음 있으면 사용자 정보 없으면 null
            console.log(userInfo);

            if(!userInfo){
                return res.json({ statusCode: CODE.FAIL, msg: "signin fail"});
            }
            else{
               // console.log("find user");
                const isEqualPw = await bcrypt.compare(userpassword, userInfo.password);
                //console.log(isEqualPw);

                if(isEqualPw) {
                    try{                     
                        const tokenValue = await token.sign(userInfo)
                        const refreshToken = tokenValue.refreshToken;
                        const accessToken =  tokenValue.accessToken;
                        const updateUser  = await User.update({refreshToken : refreshToken}, {where: {userid : userInfo.userid}});
                        setTimeout(async () => {
                            try{
                                await User.update({refreshToken : null}, {where: {userid : userInfo.userid}});
                            }catch(err){
                                console.error(err);
                            }
                        }, 60*60*1000);

                        res.cookie("accessToken", accessToken, {
                            secure : false,
                            httpOnly : true,
                        });

                        res.cookie("refreshToken", refreshToken, {
                            secure: false,
                            httpOnly : true,
                        });
                        return res.json({ statusCode: CODE.SUCCESS, msg: "login success"});
                        } catch(error){
                            console.error(error);
                            return res.json({ statusCode: CODE.SERVER_ERROR, msg: "server error"});
                        }

                } 
                else{
                    return res.json({ statusCode: CODE.FAIL, msg: "signin fail"});
                }
            }
        }catch(error){
            console.error(error);
            return res.json({ statusCode: CODE.SERVER_ERROR, msg: "server error"});
        }
        },
    logout: async (req, res) => {
        try{
            const token = req.cookies.accessToken;
            console.log(token);
            const decodedToken = await jwt.verify(token,  process.env.ACCESS_SECRET);
            console.log(decodedToken);
            const deleteRefreshToken = await User.update({refreshToken: null}, {where: {email: decodedToken.email}});
            res.cookie('accessToken', null, {
                maxAge:0,
            });
            return res.json({ statusCode: CODE.SUCCESS, msg: "login success"});
        }catch(error){
            console.error(error);
            return res.json({ statusCode: CODE.SERVER_ERROR, msg: "server error"});
        }
    },
    resetPassword : async (req, res) => {
        const ttl = 300000;
        const date = new Date();
        try{
            let isAuth = await Auth.findOne({
                where: {
                    token: req.body.token, //여기서 토큰은 인증번호를 의미.
                    email: req.body.userEmail,
                    created:{
                        [Op.gt] : date - ttl
                    }
                }
            });
            console.log(isAuth);
            if(isAuth){
                let isUser = await User.findOne({
                    where: {
                        email : req.body.userEmail
                    },
                });
                if(isUser){
                    const hashedpw = await bcrypt.hash(req.body.newpassword, 12)
                    User.update({
                        password: hashedpw
                    },{
                        where: {
                            email: req.body.userEmail
                        }
                    });
                    console.log("업데이트 완료");
                    return res.json({ statusCode: CODE.SUCCESS, msg: "update password"});
                }else{
                    return res.json({ statusCode: CODE.FAIL, msg: "No user in DB"});
                }
            }else{
                return res.json({ statusCode: CODE.UNAUTHORIZED, msg: "incorrect token"});
            }
        }catch(err){
            console.error(err);
        }
    }, renewalToken : async (req, res, err) => {

        // refreshToken만유효 => refreshToken에서 이메일 꺼내와서 해당 유저찾고 refreshToken 값비교 일치하면 재발급
        // accessToken만 유효 = 해당 유저 찾아서 refreshToken 재발급
        // 둘다유효 => 할거없음
        // 둘다 expired => 재로그인
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
        const accessResult = await token.verifyToken(accessToken);
        const refreshResult = await token.verifyToken(refreshToken);
        if(accessResult.result * refreshResult.result == 1){
            return res.json({ statusCode: CODE.SUCCESS, msg: "valid token"});
        }else if(accessResult.result == 1){
            const userEmail = accessResult.email;
            const userInfo = await User.findOne({
                where:{
                    email: userEmail,
                }
            });
            if(userInfo){
                try{
                    const refreshToken = (await token.sign(userInfo)).refreshToken;
                    const updateUser  = await User.update({refreshToken : refreshToken}, {where: {userid : userInfo.userid}});
                    setTimeout(async () => {
                            await User.update({refreshToken : null}, {where: {userid : userInfo.userid}});             
                    }, 60*60*1000);
                    res.cookie("refreshToken", refreshToken, {
                        secure: false,
                        httpOnly : true,
                    });
                    return res.json({ statusCode: CODE.SUCCESS, msg: "issue refreshToken"});
                }catch(err){
                    console.error(err);
                    return res.json({ statusCode: CODE.FAIL, msg: "can't issue refreshToken"});
                }
            }else{
                return res.json({ statusCode: CODE.FAIL, msg: "no user in db"});
            }
        }else if(refreshResult.result == 1){
            const userInfo = await findOne({
                where:{
                    email: refreshResult.email
                }
            });
            if(refreshResult == userRefreshToken.refreshToken){
                try{
                    const accessToken = (await token.sign(userInfo)).accessToken;
                    res.cookie("accessToken", accessToken, {
                        secure: false,
                        httpOnly : true,
                    });
                    return res.json({ statusCode: CODE.SUCCESS, msg: "issue accessToken"});
                }catch(error){
                    console.error(error);
                    return res.json({ statusCode: CODE.FAIL, msg:"can't issue accessToken"});
                }
            }else{
                return res.json({ statusCode: CODE.INVALID_VALUE, msg:"invalid refreshToken"});
            }
        }else{
            return res.json({ statusCode: CODE.INVALID_VALUE, msg: "login again"});
        }
    }
}

module.exports = member;