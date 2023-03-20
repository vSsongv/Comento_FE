const nodemailer = require("nodemailer");
const errorResponse = require("./errorResponse");
const { basicResponse } = require("./response");
const responseDetail = require("./responseDetail");
const ejs = require('ejs');
const { logger } = require("../config/winston");
exports.sendEmail = async function (data) {
  try {
    const email = data.email;
    const nickname = data.nickname || "";
    const content = data.content;

    let transporter = await nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `${nickname}` + "님이 멘토 권한을 신청하였습니다.",
      text: "유저의 이메일: " + `${email}\n\n` + `${content}`,
    });
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(basicResponse(responseDetail.DB_ERROR));
  }
};

exports.sendMentoringEmail = async function(data){
  try {
    const menteeEmail = data.email;
    const mentorNickname = data.mentorNickname;
    const menteeNickname = data.menteeNickname
    const chattingLink = data.chattingLink;
    let emailTemplete;
    ejs.renderFile('./config/emailTemplete.ejs', {
      mentorNickname : mentorNickname, 
      menteeNickname: menteeNickname, 
      chattingLink: chattingLink
    }, function (err, data) {
      if(err){console.log('ejs.renderFile err')}
      emailTemplete = data;
    });

    let transporter = await nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    transporter.sendMail({
      from: process.env.EMAIL,
      to: "dbwjdgh03@ajou.ac.kr",
      subject: `코멘토 멘토링 체결 완료: ${mentorNickname}` + "님이 멘토링을 승낙하였습니다.",
      html: emailTemplete
    }, (error, info) => {
      if(error){
        console.error(error);
      }
      transporter.close();
    });
  } catch (error) {
    logger.error(`${error.message}`);
  }
}