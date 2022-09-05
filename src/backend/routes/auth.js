const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('comeback');
    res.send('test');
});

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
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
});


router.post('/signin', isNotLoggedIn, async (req, res, next) => {
        try{
            /*if() {

            }*/ //jwt 토근이 인증되어있다면
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
                    // response
                    const refreshToken = jwt.sign({
                        email : email,
                        nickname : nickname,
                        image: image,
                    }, process.env.REFRESH_SECRET, {
                        expiresIn: "24h", // 24시간후 만료
                        issuer: "yujeongho",
                    });

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
        });

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destory();
    req.redirect('/');
});

module.exports = router;
