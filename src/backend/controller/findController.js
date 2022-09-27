const dotenv = require('dotenv');
dotenv.config();
const { Op } = require('sequelize');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { auth, Auth } = require('../models');
const { user, User } = require('../models');
const CODE = require('../modules/statusCode');

const find = {
    password : async (req, res) => {
        try{
            const userEmail = req.body.userEmail
            const isUser = await User.findOne({
                where :{
                    email : userEmail,
                }
            }); 
            console.log(isUser);
            if(isUser){
                let transporter = nodemailer.createTransport({
                    service: "Gmail",
                    host: "smtp.gmail.com",
                    secure: true,
                    port: 465,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });
                const token = crypto.randomBytes(6).toString('hex');
                let info = await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: userEmail,
                    subject: "코멘토 비밀번호 초기화 이메일입니다.",
                    text: "비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요." + `http://localhost/reset/${token}`,
                });
                console.log("mail 발송완료");
                const authUser = await Auth.findOne({
                    where: {
                        email: userEmail
                    }
                });
                if(authUser){
                    console.log("then");
                    Auth.update({
                        token: token,
                        created: Date.now()
                    },{
                        where: {
                            email: userEmail
                        }
                    })
                } else{
                    const data = {
                        token,
                        email: userEmail,
                        ttl: 300,
                        userid: isUser.userid
                    };
                    Auth.create(data);
                    setTimeout(async () => {
                        try{
                            await Auth.destroy({
                            where:  { email: data.email }
                            });
                        }catch(err){
                            console.error(err);
                        }
                    }, 300*1000);
                }
                return res.json({ statusCode: CODE.SUCCESS, token : token, msg: "send email successfully" });
            }else{
                return res.json({ statusCode: CODE.FAIL, msg: "no data in database" });
            }
        }catch(err){
            console.error(err);
            return res.json({ statusCode: CODE.FAIL, msg: "fail" });
        }
    }
};

module.exports = find;