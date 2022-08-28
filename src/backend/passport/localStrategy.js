const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async(email, password, done) => {
        try{
            const exUser = await User.findOne({where: { email }});
            console.log(exUser);
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    console.log(exUser);
                } else{
                    done(null, false, {message: '비밀번호 불일치'});
                }
            } else{
                done(null, false, {message: '가입하지 않은 회원'}); 
            }
        } catch(error){
            console.error(error);
            done(error);
        }
    }));
};