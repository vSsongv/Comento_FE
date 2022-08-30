const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
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


router.post('/login', isNotLoggedIn, async (req, res, next) => {
        try{
            const hashpw = await bcrypt.hash(req.body.password, 12);
            const userInfo = await User.findOne({
                where :{
                    email : req.body.email
                }
            });
            console.log(hashpw);
            console.log(userInfo.password);
            console.log(hashpw == userInfo.password);
            if(!(userInfo && userInfo.password == hashpw)){
                res.status(403).json("Not Authorized");
            }
            else{       
                    try{
                        const key = process.env.SECRET_KEY;
                        const nickname = user.nickname;
                        const image = user.image;
                        const email = user.email;
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
