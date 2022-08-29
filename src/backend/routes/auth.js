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
        });
        
        res.status(201).send('create user sucessfully');
    } catch(err){
        console.error(err);
        next(err);
    }
});


router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local',{session: false}, (authError, user, info) => {
        if (authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destory();
    req.redirect('/');
});

module.exports = router;
