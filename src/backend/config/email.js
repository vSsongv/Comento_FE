const nodemailer = require("nodemailer");
const errorResponse = require("./errorResponse");
const { basicResponse } = require("./response");
const responseDetail = require("./responseDetail");

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
