const User = require('../models/user');
const CODE = require('../modules/statusCode');

const check = {
    id: async (req, res) => {
        try{
            //console.log('check req => ', req);
            const userEmail = req.query.userEmail;
            const validEmailCheck = (userEmail) => {
                const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                return pattern.test(userEmail)
            }

            const checkEmail = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            const validation = validEmailCheck(userEmail);
            if(checkEmail == null && validation == true){
                return res.json({ statusCode: CODE.SUCCESS, msg: "SUCCESS", result: true});
            }else{
                if(checkEmail !== null){
                    return res.json({ statusCode: CODE.DUPLICATE, msg: "email that already exists", result: false});
                }
                else if(validation == false){
                    return res.json({ statusCode: CODE.INVALID_VALUE, msg: "invalid email form", result: false});
                }else{
                    return res.json({ statusCode: CODE.FAIL, msg: "both", result: false});
                }
            }         
        }catch(err){
            console.error(err);
            return res.json({ statusCode: CODE.FAIL, msg: "fail", result: false});
        }
    },
    phone: async (req, res) => {
        try{
            //console.log('check req => ', req);
    
            let userPhone = req.query.userPhoneNum;
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
            const validation = validCallNumberCheck(userPhone);
            if(checkPhone == null && validation == true ){
                return res.json({ statusCode: CODE.SUCCESS, msg: "SUCCESS", result: true});
            }
            else{
                if(checkPhone !== null){
                    return res.json({ statusCode: CODE.DUPLICATE, msg: "phonenum that already exists", result: false});
                }
                else if(validation == false){
                    return res.json({ statusCode: CODE.INVALID_VALUE, msg: "incorrect phonenum form", result: false});
                }else{
                    return res.json({ statusCode: CODE.FAIL, msg: "both", result: false});
                }
            }
            
        } catch(err){
            console.error(err);
            return res.json({ statusCode: CODE.FAIL, msg: "fail", result: false});
        }
    },
    nickname : async (req, res) => {
        try{
            //console.log('check req => ', req);
    
            const userNick = req.query.userNickname;
            const validNicknameCheck = (userNick) => {
                const pattern = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
                return pattern.test(userNick);
            };
            const checkNick = await User.findOne({
                where: {
                    nickname: userNick
                }
            });
            const validation = validNicknameCheck(userNick);
            if(checkNick == null && validation == true){
                return res.json({ statusCode: CODE.SUCCESS, msg: "SUCCESS", result: true});
            }
            else{
                if(checkNick !== null){
                    return res.json({ statusCode: CODE.DUPLICATE, msg: "nickname that already exists", result: false});
                }
                else if(validation == false){
                    return res.json({ statusCode: CODE.INVALID_VALUE, msg: "incorrect nickname form", result: false});
                }else{
                    return res.json({ statusCode: CODE.FAIL, msg: "both", result: false});
                }
            }
            
        } catch(err){
            console.error(err);
            return res.json({ statusCode: CODE.FAIL, msg: "fail", result: false});
        }
    }
};

module.exports = check;