const bcrypt = require("bcrypt");
const fs = require("fs");
const imageDir = __dirname + "/../user/";
// const path = require("path");
const userService = require("./userService");
const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const asyncHandler = require("../config/asyncHandler");
const errorResponse = require("../config/errorResponse");
const jwt = require('../config/token');
const regEmail = require("regex-email");
const { sendEmail } = require("../config/email");
const regPassword =
  /^(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*-_+=\\(\\)\])(?=.*[0-9]).{8,16}/;
const regPhoneNum = /^\d{3}\d{3,4}\d{4}$/;
const regNickname = /^[a-zA-Z가-힣]*$/;
const regNumber = /^[0-9]/;

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

const member = {
  signup: asyncHandler(async (req, res, next) => {
    const { email, nickname, password, phone } = req.body;
    let profile;
    let length = !req.files ? 0 : req.files.length;
    for (let i = 0; i < length; i++) {
      profile = req.files[i]["path"];
    }
    profile = profile || null;
    if (!email) return next(new errorResponse(detailResponse.EMPTY_EMAIL), 400);

    if (email.length > 30)
      return next(new errorResponse(detailResponse.EMAIL_LENGTH_ERROR), 400);

    if (!regEmail.test(email))
      return next(new errorResponse(detailResponse.EMAIL_FORM, 400));

    if (!password)
      return next(new errorResponse(detailResponse.EMPTY_PASSWORD, 400));

    if (password.length < 8)
      return next(new errorResponse(detailResponse.PASSWORD_LENGTH_ERROR, 400));

    if (!regPassword.test(password))
      return next(new errorResponse(detailResponse.PASSWORD_FORM, 400)); //비밀번호는 영문, 숫자, 특수문자 포함 8~16자

    if (!phone) return next(new errorResponse(detailResponse.EMPTY_PHONE, 400));

    if (!regPhoneNum.test(phone))
      return next(new errorResponse(detailResponse.PHONE_FORM, 400));

    if (!nickname)
      return next(new errorResponse(detailResponse.EMPTY_NICKNAME, 400));

    if (nickname.length > 10 || nickname.length < 1)
      return next(new errorResponse(detailResponse.NICKNAME_LENGTH_ERROR, 400));

    if (!regNickname.test(nickname))
      return next(new errorResponse(detailResponse.NICKNAME_FORM), 400);

    const checkEmail = await userService.checkEmail(email);
    if (checkEmail)
      return next(
        new errorResponse(basicResponse(detailResponse.DUP_EMAIL), 400)
      );

    const checkNickname = await userService.checkNickname(nickname);
    if (checkNickname) {
      return next(
        new errorResponse(basicResponse(detailResponse.DUP_NICKNAME), 400)
      );
    }

    const checkPhone = await userService.checkPhone(phone);
    if (checkPhone)
      return next(
        new errorResponse(basicResponse(detailResponse.DUP_PHONE), 400)
      );

    /* 이미지 업로드 코드는 aws s3설정 완료이후 할 것  
        let newpath;
        if(oldpath){
            newpath = path.join(imageDir , path.basename(oldpath));
            console.log(newpath);
            fs.rename(oldpath, newpath, function(err) {
                newpath = null;
            });      
        }else{
            newpath = null;
        }*/

    const hashedpw = await bcrypt.hash(password, 12);
    await userService.createUser(nickname, email, hashedpw, profile, phone);
    return res.send(basicResponse(detailResponse.SIGNUP_SUCCESS));
  }),
  /*autosignin: (req, res, next) => {
        const verifyResult = token.verifyToken(req.cookies.accessToken);
        if(verifyResult.result == 1){
            return res.json({ statusCode: CODE.SUCCESS, msg: "auto-signin success", decodedInfo: verifyResult});
        }else{
            return res.json({ statusCode: CODE.FAIL, msg: "auto-signin fail"});
        }
    },*/
  signin: asyncHandler(async (req, res, next) => {
    const { email, password, isKeep } = req.body;
    if (!email) return next(new errorResponse(detailResponse.EMPTY_EMAIL, 400));
    if (!password)
      return next(new errorResponse(detailResponse.EMPTY_PASSWORD, 400));

    const userInfo = await userService.checkEmail(email); // 해당 이메일 사용자 찾음 있으면 사용자 정보 없으면 null
    if (!userInfo)
      return next(new errorResponse(detailResponse.NOT_EXIST_EMAIL, 400));
    const isEqualPw = await bcrypt.compare(password, userInfo.password);
    let token;
    if (isEqualPw) {
      token = await userService.signin(userInfo, isKeep);
      if (isKeep)
        await userService.saveRefreshToken(token.refreshToken, userInfo.userid);
      return res.send(resultResponse(detailResponse.SIGNIN_SUCCESS, token));
    } else
      return next(new errorResponse(detailResponse.PASSWORD_MISMATCH, 400));
  }),
  resetPassword: asyncHandler(async (req, res, next) => {
    const { token, email, password } = req.body;
    let isAuth = await userService.getCertNum(email);
    if (!isAuth) return next(new errorResponse(detailResponse.NONE_TOKEN, 400));
    if (isAuth.token === token) {
      //인증번호와 이메일이 일치한 경우
      let isUser = await userService.checkEmail(email);
      if (isUser) {
        const hashedpw = await bcrypt.hash(password, 12);
        await userService.updateUser(email, hashedpw);
        await userService.deleteCertNum(email);
        return res.send(basicResponse(detailResponse.MODIFY_USER_SUCCESS));
      } else
        return next(new errorResponse(detailResponse.NOT_EXIST_EMAIL, 400));
    } else return next(new errorResponse(detailResponse.INCORRECT_TOKEN, 400)); //인증번호가 일치하지 않는경우
  }),
  checkId: asyncHandler(async (req, res, next) => {
    const { email } = req.query;
    if (!email) return next(new errorResponse(detailResponse.EMPTY_EMAIL, 400));

    if (!regEmail.test(email))
      return next(new errorResponse(detailResponse.EMAIL_FORM, 400));

    const checkEmail = await userService.checkEmail(email);
    if (!checkEmail)
      return res.send(basicResponse(detailResponse.AVAILABLE_EMAIL));
    return next(new errorResponse(detailResponse.DUP_NICKNAME, 400));
  }),
  checkPhone: asyncHandler(async (req, res, next) => {
    let { phone } = req.query;

    if (!phone) return next(new errorResponse(detailResponse.EMPTY_PHONE, 400));
    if (!regPhoneNum.test(phone))
      return next(new errorResponse(detailResponse.PHONE_FORM, 400));
    const checkPhone = await userService.checkPhone(phone);

    if (!checkPhone)
      return res.send(basicResponse(detailResponse.AVAILABLE_PHONE));
    else return next(new errorResponse(detailResponse.DUP_PHONE, 400));
  }),
  checkNickname: asyncHandler(async (req, res, next) => {
    let { nickname } = req.query;

    if (!nickname)
      return next(new errorResponse(detailResponse.EMPTY_NICKNAME, 400));
    if (!regNickname.test(nickname))
      return next(new errorResponse(detailResponse.NICKNAME_FORM, 400));
    const checkNickname = await userService.checkNickname(nickname);

    if (!checkNickname)
      return res.send(basicResponse(detailResponse.AVAILABLE_NICKNAME));
    else return next(new errorResponse(detailResponse.DUP_NICKNAME, 400));
  }),
  findPassword: asyncHandler(async (req, res, next) => {
    const email = req.body.email;
    const isUser = await userService.checkEmail(email);
    if (!isUser)
      return next(new errorResponse(detailResponse.NOT_EXIST_EMAIL, 400));
    const token = await sendEmail(email);
    const authUser = await userService.getCertNum(email);
    if (authUser) await userService.updateCertNum(email, token);
    else {
      await userService.createCertNum(email, token);
      setTimeout(async () => {
        await userService.deleteCertNum(email);
      }, 300 * 1000); //300초 뒤 삭제
    }
    return res.send(basicResponse(detailResponse.SEND_EMAIL));
  }),
  updateUserInfo: asyncHandler(async (req, res) => {
    const { email, nickname, password, profile, phone } = req.body;
  }),
  updateMentoRole : asyncHandler(async function(req,res,next){ // 멘토 권한 부여 API 손보기
    const userIdx = req.user.userid;
    if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
    if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));
    
    const userInfo = req.user;
    if(userInfo.role === 'A') return next(new errorResponse(basicResponse(detailResponse.ALREADY_MENTO), 400));

    userInfo.role='A'; //권한을 멘토로 변경

    await userService.updateMentoRole(userIdx);
    const token = await userService.signin(userInfo, userInfo.isKeep); //토큰 재발급
    if(token.refreshToken) await userService.saveRefreshToken(token.refreshToken, userInfo.userid);

    return res.send(resultResponse(detailResponse.MENTO_AUTH_SUCCESS, token));

})
  //     renewalToken : async (req, res, err) => {

  //     // refreshToken만유효 => refreshToken에서 이메일 꺼내와서 해당 유저찾고 refreshToken 값비교 일치하면 재발급
  //     // accessToken만 유효 = 해당 유저 찾아서 refreshToken 재발급
  //     // 둘다유효 => 할거없음
  //     // 둘다 expired => 재로그인
  //     const accessToken = req.cookies.accessToken;
  //     const refreshToken = req.cookies.refreshToken;
  //     const accessResult = await token.verifyToken(accessToken);
  //     const refreshResult = await token.verifyToken(refreshToken);
  //     if(accessResult.result * refreshResult.result == 1){
  //         return res.json({ statusCode: CODE.SUCCESS, msg: "valid token"});
  //     }else if(accessResult.result == 1){
  //         const userEmail = accessResult.validToken.email;
  //         const userInfo = await User.findOne({
  //             where:{
  //                 email: userEmail,
  //             }
  //         });
  //         if(userInfo){
  //             try{
  //                 const refreshToken = (await token.sign(userInfo)).refreshToken;
  //                 const updateUser  = await User.update({refreshToken : refreshToken}, {where: {userid : userInfo.userid}});
  //                 setTimeout(async () => {
  //                         await User.update({refreshToken : null}, {where: {userid : userInfo.userid}});
  //                 }, 60*60*1000);
  //                 res.cookie("refreshToken", refreshToken, {
  //                     secure: false,
  //                     httpOnly : true,
  //                 });
  //                 return res.json({ statusCode: CODE.SUCCESS, msg: "issue refreshToken"});
  //             }catch(err){
  //                 console.error(err);
  //                 return res.json({ statusCode: CODE.FAIL, msg: "can't issue refreshToken"});
  //             }
  //         }else{
  //             return res.json({ statusCode: CODE.FAIL, msg: "no user in db"});
  //         }
  //     }else if(refreshResult.result == 1){
  //         const userInfo = await User.findOne({
  //             where:{
  //                 email: refreshResult.validToken.email
  //             }
  //         });
  //         console.log(refreshToken);
  //         console.log(userInfo.refreshToken);
  //         if(refreshToken == userInfo.refreshToken){
  //             try{
  //                 const accessToken = (await token.sign(userInfo)).accessToken;
  //                 res.cookie("accessToken", accessToken, {
  //                     secure: false,
  //                     httpOnly : true,
  //                 });
  //                 return res.json({ statusCode: CODE.SUCCESS, msg: "issue accessToken"});
  //             }catch(error){
  //                 logger.error(`${error.message}`);
  //                 return res.json({ statusCode: CODE.FAIL, msg:"can't issue accessToken"});
  //             }
  //         }else{
  //             return res.json({ statusCode: CODE.INVALID_VALUE, msg:"invalid refreshToken"});
  //         }
  //     }else{
  //         return res.json({ statusCode: CODE.INVALID_VALUE, msg: "login again"});
  //     }
  // }
};

module.exports = member;
