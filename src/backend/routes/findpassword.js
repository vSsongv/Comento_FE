const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const { user, User } = require('../models');

router.post("/password", async (req, res) => {
    try{
        const userEmail = req.body.email
        const isUser = await User.findOne({
            where :{
                email : userEmail,
            }
        }); 

        if(isUser){
            let transporter = nodemailer.createTransport({
                service: "Gmail",
                host: "smtp.gmail.com",
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            const newPassword = Math.random().toString(36).slice(2);
            let info = await transporter.sendMail({
                from: process.env.EMAIL,
                to: userEmail,
                subject: "코멘토 신규 비밀번호 안내문자입니다",
                text: "신규 비밀번호: " + newPassword
            });
            console.log("mail 발송완료");
            return res.status(200).json({msg: "메일이 발송되었습니다"});
        }else{
            return res.status(400).json({msg: "No Id in database"});
        }
    }catch(err){
        console.error(err);
    }
});

module.exports = router;