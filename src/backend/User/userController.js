const bcrypt = require("bcrypt");
const secret = require("../config/secret");
const userService = require("./userService");
const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const asyncHandler = require("../config/asyncHandler");
const errorResponse = require("../config/errorResponse");
const regEmail = require("regex-email");
const { sendEmail } = require("../config/email");
const { deleteSingleFile } = require("../config/s3");
const { equal } = require("assert");
const regPassword =
  /^(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*-_+=\\(\\)\])(?=.*[0-9]).{8,16}/;
const regPhoneNum = /^\d{3}\d{3,4}\d{4}$/;
const regNickname = /^[a-zA-Z가-힣]*$/;
const regNumber = /^[0-9]/;

const member = {
  signup: asyncHandler(async (req, res, next) => {
    const { email, nickname, password, phone } = JSON.parse(req.body.data);
    let profile = req.file.key || null;

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
    return next(new errorResponse(detailResponse.DUP_EMAIL, 400));
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
  updateMentoRole: asyncHandler(async function (req, res, next) {
    const userIdx = req.user.userid;
    if (!userIdx)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400)
      );
    if (!regNumber.test(userIdx))
      return next(
        new errorResponse(
          basicResponse(detailResponse.TOKEN_VERFICATION_FAIL),
          400
        )
      );

    const userInfo = req.user;
    if (userInfo.role === "A")
      return next(
        new errorResponse(basicResponse(detailResponse.ALREADY_MENTO), 400)
      );

    userInfo.role = "A"; //권한을 멘토로 변경

    await userService.updateMentoRole(userIdx);
    const token = await userService.signin(userInfo, userInfo.isKeep); //토큰 재발급
    if (token.refreshToken)
      await userService.saveRefreshToken(token.refreshToken, userInfo.userid);

    return res.send(resultResponse(detailResponse.MENTO_AUTH_SUCCESS, token));
  }),
  getUserInfo: asyncHandler(async function (req, res, next) {
    const userIdx = req.user.userid;
    if (!userIdx)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400)
      );
    if (!regNumber.test(userIdx))
      return next(
        new errorResponse(
          basicResponse(detailResponse.TOKEN_VERFICATION_FAIL),
          400
        )
      );
    const userInfo = await userService.getUserInfo(userIdx);
    return res.send(resultResponse(detailResponse.SUCCESS, userInfo));
  }),
  updateNickname: asyncHandler(async function (req, res, next) {
    const userIdx = req.user.userid;
    const nickname = req.body.nickname;
    if (!userIdx)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400)
      );
    if (!regNumber.test(userIdx))
      return next(
        new errorResponse(
          basicResponse(detailResponse.TOKEN_VERFICATION_FAIL),
          400
        )
      );
    if (!nickname)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_NICKNAME), 400)
      );
    await userService.updateUserNickname(nickname, userIdx);
    return res.send(
      resultResponse(detailResponse.PATCH_NICKNAME_SUCCESS, nickname)
    );
  }),
  updatePassword: asyncHandler(async function (req, res, next) {
    const userIdx = req.user.userid;
    const { prevPassword, password } = req.body;

    if (!userIdx)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400)
      );
    if (!regNumber.test(userIdx))
      return next(
        new errorResponse(
          basicResponse(detailResponse.TOKEN_VERFICATION_FAIL),
          400
        )
      );
    if (prevPassword && password == 0)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_PASSWORD), 400)
      );

    const userInfo = await userService.getUserPassword(userIdx);

    let isEqualPw = await bcrypt.compare(prevPassword, userInfo.password);
    if (!isEqualPw)
      return next(
        new errorResponse(basicResponse(detailResponse.NOT_MATCH_PASSWORD), 400)
      );

    hashedpw = await bcrypt.hash(password, 12);
    await userService.updateUserPassword(hashedpw, userIdx);
    return res.send(basicResponse(detailResponse.PATCH_PASSWORD_SUCCESS));
  }),
  updateProfile: asyncHandler(async function (req, res, next) {
    const profile = req.file.key || null;
    try {
      const userIdx = req.user.userid;
      if (!profile)
        next(
          new errorResponse(basicResponse(detailResponse.EMPTY_PROFILE), 400)
        );

      if (!userIdx)
        return next(
          new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400)
        );
      if (!regNumber.test(userIdx))
        return next(
          new errorResponse(
            basicResponse(detailResponse.TOKEN_VERFICATION_FAIL),
            400
          )
        );
      const prevProfile = await userService.getUserInfo(userIdx);
      await userService.updateProfile(profile, userIdx);
      if (prevProfile.image) {
        const params = {
          Bucket: secret.bucket,
          Key: prevProfile.image,
        };
        deleteSingleFile(params);
      }
      return res.send(
        resultResponse(detailResponse.PATCH_PROFILE_SUCCESS, profile)
      );
    } catch (error) {
      const params = {
        Bucket: secret.bucket,
        Key: profile,
      };
      deleteSingleFile(params);
      return next(new errorResponse(basicResponse(detailResponse.DB_ERROR)));
    }
  }),
  authRequestEmail: asyncHandler(async function (req, res, next) {
    const userIdx = req.user.userid;
    const content = req.body.content;
    console.log(userIdx, content);
    let email = req.body.email;
    console.log(email);
    let emailData = {};
    if (!userIdx)
      return next(
        new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400)
      );
    if (!regNumber.test(userIdx))
      return next(
        new errorResponse(
          basicResponse(detailResponse.TOKEN_VERFICATION_FAIL),
          400
        )
      );
    if (content.length > 200)
      return next(
        new errorResponse(
          basicResponse(detailResponse.CONTENT_LENGTH_OVER),
          400
        )
      );
    const userInfo = await userService.getUserInfo(userIdx);
    const nickname = userInfo.nickname;
    email = email || userInfo.email;
    emailData["nickname"] = nickname;
    emailData["content"] = content;
    emailData["email"] = email;
    await sendEmail(emailData);
    return res.send(basicResponse(detailResponse.SEND_EMAIL));
  }),
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
