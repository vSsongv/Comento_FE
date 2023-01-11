const nodemailer = require("nodemailer");
const crypto = require('crypto');
const errorResponse = require("./errorResponse");
const { basicResponse } = require("./response");
const responseDetail = require("./responseDetail");

exports.sendEmail = async function(email){
    try{
        let transporter = await nodemailer.createTransport({
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
            to: email,
            subject: "코멘토 비밀번호 초기화 이메일입니다.",
            text: "비밀번호 초기화에 필요한 인증번호는 다음과 같습니다\n"+`${token}`,
        });
        return token;
    }catch(error){
        console.error(error);
        throw new errorResponse(basicResponse(responseDetail.DB_ERROR));
    }
}