const User = require('../models/user');

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
                return res.send({status: 200, result: 1})
            }else{
                if(checkEmail == false){
                    return res.send({status: 409, result:0, msg:"이메일 중복입니다."})
                }
                else{
                    return res.send({status: 412, result:0, msg:"이메일 형식이 아닙니다."})
                }
            }         
        }catch(err){
            console.error(err);
            return res.send({status: 400, result: err });
        }
    },
    phone: async (req, res) => {
        try{
            //console.log('check req => ', req);
    
            let userPhone = req.body.phone;
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
                res.send({status: 200, result: 1})
            }
            else{
                if(checkPhone == false){
                    return res.send({status: 409, result:0, msg:"핸드폰 중복입니다."})
                }
                else{
                    return res.send({status: 412, result:0, msg:"핸드폰 번호 형식이 아닙니다."})
                }
            }
            
        } catch(err){
            console.error(err);
            return res.send({status: 400, result: err });
        }
    },
    nickname : async (req, res) => {
        try{
            //console.log('check req => ', req);
    
            const userNick = req.body.nickname;
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
                return res.send({status: 200, result: 1})
            }
            else{
                if(checkNick == false){
                    return res.send({status: 409, result:0, msg:"닉네임 중복입니다."})
                }
                else{
                    return res.send({status: 412, result:0, msg:"닉네임은 한글, 영문, 숫자만 입력가능하고 2자 이상이어야 합니다."})
                }  
            }
            
        } catch(err){
            console.error(err);
            return res.send({status: 400, result: err });
        }
    }
};

module.exports = check;