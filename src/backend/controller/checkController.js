const User = require('../models/user');

const check = {
    id: async (req, res) => {
        try{
            //console.log('check req => ', req);
            const userEmail = req.body.userEmail;
            const checkId = await User.findOne({
                where: {
                    email: userEmail
                }
            });

            if(checkId){
                res.send({status: 200, result: 1})
            }else{
                return res.send({status: 200 , result: 0})
            }         
        }catch(err){
            console.error(err);
            return res.send({status: 400, result: err });
        }
    },
    phone: async (req, res) => {
        try{
            //console.log('check req => ', req);
    
            const userPhone = req.body.phone;
    
            const checkPhone = await User.findOne({
                where: {
                    cellphone: userPhone
                }
            });
            if(checkPhone){
                res.send({status: 200, result: 1})
            }
            else{
                return res.send({status: 200 , result: 0})
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
    
            const checkNick = await User.findOne({
                where: {
                    email: userNick
                }
            });
            if(checkNick){
                res.send({status: 200, result: 1})
            }
            else{
                return res.send({status: 200 , result: 0})
            }
            
        } catch(err){
            console.error(err);
            return res.send({status: 400, result: err });
        }
    }
};

module.exports = check;