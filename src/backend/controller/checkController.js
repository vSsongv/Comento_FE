const User = require('../models/user');
const CODE = require('../modules/statusCode');

const check = {
    id: async (req, res) => {
        try{
            //console.log('check req => ', req);
            const userEmail = req.body.userEmail;
            const validEmailCheck = (userEmail) => {
                const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                return pattern.test(userEmail)
            }

            const checkEmail = await User.findOne({
                where: {
                    email: userEmail
                }
            });

            if(checkEmail && validEmailCheck(userEmail)){
                return res.json({ statusCode: CODE.SUCCESS, msg: "incorrect token", result: 1});
            }else{
                if(checkEmail == false){
                    return res.json({ statusCode: CODE.DUPLICATE, msg: "email that already exists", result: 0});
                }
                else{
                    return res.json({ statusCode: CODE.INVALID_VALUE, msg: "invalid email form", result: 0});
                }
            }         
        }catch(err){
            console.error(err);
            return res.json({ statusCode: CODE.FAIL, msg: "fail", result: 0});
        }
    },
    phone: async (req, res) => {
        try{
            //console.log('check req => ', req);
    
            let userPhone = req.body.userPhoneNum;
            const validCallNumberCheck = (userPhone) =>{
                userPhone = userPhone.replace(/-/g, '');
                const pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
                return pattern.test(userPhone);
            }

            const checkPhone = await User.findOne({
                where: {
                    cellphone: userPhone
                }
            });

            if(checkPhone && validCallNumberCheck(userPhone)){
                return res.json({ statusCode: CODE.SUCCESS, msg: "SUCCESS", result: 1});
            }
            else{
                if(checkPhone == false){
                    return res.json({ statusCode: CODE.DUPLICATE, msg: "phonenum that already exists", result: 0});
                }
                else{
                    return res.json({ statusCode: CODE.INVALID_VALUE, msg: "incorrect phonenum form", result: 0});
                }
            }
            
        } catch(err){
            console.error(err);
            return res.json({ statusCode: CODE.FAIL, msg: "fail", result: 0});
        }
    },
    nickname : async (req, res) => {
        try{
            //console.log('check req => ', req);
    
            const userNick = req.body.userNickname;
            const validNicknameCheck = (userNick) => {
                const pattern = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
                return pattern,test(userNick);
            }
            const checkNick = await User.findOne({
                where: {
                    email: userNick
                }
            });
            if(checkNick && validNicknameCheck(userNick)){
                return res.json({ statusCode: CODE.SUCCESS, msg: "SUCCESS", result: 1});
            }
            else{
                if(checkNick == false){
                    return res.json({ statusCode: CODE.DUPLICATE, msg: "nickname that already exists", result: 0});
                }
                else{
                    return res.json({ statusCode: CODE.INVALID_VALUE, msg: "incorrect nickname form", result: 0});
                }  
            }
            
        } catch(err){
            console.error(err);
            return res.json({ statusCode: CODE.FAIL, msg: "fail", result: 0});
        }
    }
};

module.exports = check;