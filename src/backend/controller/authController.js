const User = require('../models/user');
const { auth, Auth } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const member = {
    signup: async (req, res , next) => {
            try{
                const checkEmail =  await User.findOne({
                    where: {
                        email :req.body.email,
                    }
                });
                const checkNickname = await User.findOne({
                    where: {
                        nickname: req.body.nickname,
                    }
                });
                if(checkEmail){
                    return res.status(403).send('email that already exists');
                }
                if(checkNickname){
                    return res.status(403).send('nickname that already exists');
                }
        
                const hashedpw = await bcrypt.hash(req.body.password, 12);
        
                await User.create({
                    nickname: req.body.nickname,
                    email : req.body.email,
                    password: hashedpw,
                    image: req.body.image,
                    cellphone: req.body.cellphone,
                });
                
                res.status(201).send('create user sucessfully');
            } catch(err){
                console.error(err);
                next(err);
            }
    },
    autosignin: (req, res, next) => {
        console.log(req.cookies.accessToken);
        if(req.cookies && req.cookies.accessToken){
            jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
                if(err){
                    console.error(err);
                    return res.status(401).send('에러 발생');
                }
                console.log('자동로그인');
                return res.send(decoded);
            })
        }else{
            return res.send("자동로그인 불가능");
        }
    },
    signin : async (req, res, next) => {
        try{
            
            const userpassword = req.body.password;
            const userInfo = await User.findOne({
                where :{
                    email : req.body.email
                }
            }); // 해당 이메일 사용자 찾음 있으면 사용자 정보 없으면 null
            console.log(userInfo);

            if(!userInfo){
                return res.status(400).json({msg: "로그인 실패"});
            }
            else{
                console.log("find user");
                const isEqualPw = await bcrypt.compare(userpassword, userInfo.password);
                console.log(isEqualPw);

                if(isEqualPw) {
                    try{
                        const key = process.env.SECRET_KEY;
                        const nickname = userInfo.nickname;
                        const image = userInfo.image;
                        const email = userInfo.email;
                        const accessToken = jwt.sign(
                        {
                            type: "JWT",
                            email : email,
                            nickname: nickname,
                            image: image,
                        },
                        process.env.ACCESS_SECRET,
                        {
                        expiresIn: "15m", // 15분후 만료
                        issuer: "yujeongho",
                        }
                    );
                        const refreshToken = jwt.sign({
                            email : email
                        }, process.env.REFRESH_SECRET, {
                            expiresIn: "1h", // 24시간후 만료
                            issuer: "yujeongho",
                        });

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
                        res.status(200).json("login success");
                        } catch(error){
                            console.error(error);
                            res.status(500).json(error);
                        }

                } // 로그인 성공
                else{
                    return res.status(404).json({msg : "로그인 실패"});
                }
            }
        }catch(error){
            console.error(error);
        }
        },
    logout: async (req, res) => {
        const token = req.cookies.accessToken;
        const decodedToken = await jwt.verify(token,  process.env.ACCESS_SECRET);
        const deleteRefreshToken = await User.update({refreshToken: null}, {where: {email: decodedToken.email}});
        res.cookie('accessToken', null, {
            maxAge:0,
        });
        return res.status(200).json({msg : "로그아웃되었습니다."});
    },
    resetPassword : async (req, res) => {
        const ttl = 300000;
        const date = new Date();
        console.log(date);
        console.log(date, ttl);
        try{
            let isAuth = await Auth.findOne({
                where: {
                    token: req.body.token,
                    email: req.body.email,
                    created:{
                        [Op.gt] : date - ttl
                    }
                }
            });
            console.log(isAuth);
            if(isAuth){
                let isUser = await User.findOne({
                    where: {
                        email : req.body.email
                    },
                });
                if(isUser){
                    const hashedpw = await bcrypt.hash(req.body.newpassword, 12)
                    User.update({
                        password: hashedpw
                    },{
                        where: {
                            email: req.body.email
                        }
                    });
                    console.log("업데이트 완료");
                    return res.status(200).json({msg: "비밀번호 업데이트 완료"});
                }else{
                    return res.status(400).json({msg: "유저가 없어요"});
                }
            }else{
                return res.status(401).json({msg : "토큰 만료"});
            }
        }catch(err){
            console.error(err);
        }
    }
}

module.exports = member;