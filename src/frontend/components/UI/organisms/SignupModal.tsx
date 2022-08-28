import React, { useRef } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import LoginModal from "../molescules/LoginModal";
import userImageBg from "../../../assets/images/register_imageadd_bg.png";
import userImageBtn from "../../../assets/images/register_imageadd_btn.png";
import { useState } from "react";
import * as Login from "../molescules/LoginInputs";

const RootContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const AgreeText = styled.p`
  font-family: NanumGothic;
  font-size: 18px;
  color: #858585;
  margin: 26px 0 50px 0;
`
const ImageAdd = styled.div`
  background: url("${ userImageBg }");
  background-size: contain;
  padding: 158px 0 0 161px;
  width: 204px;
  height: 204px;
  flex-shrink: 0;
`
const ImageAddBtn = styled.div`
  background: url("${ userImageBtn }");
  background-size: contain;
  border: 0;
  cursor: pointer;
  width: 35px;
  height: 35px;
`
const ImageAddInput = styled.input`
  display: none;
`

const Space = styled.div`height: 20px`
const BigSpace = styled.div`height: 40px`

interface SignUpResultData {
    success: boolean,
}
interface SignUpModalProps {
  onRegister: (
    email: string,
    pw: string,
    nickname: string,
    phoneNumber: string
  ) => SignUpResultData;
}

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneRegex = /^\d+$/;
const pwRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 8-15자 사이

const getEmailError = (s: string) => {
  if (!s) return '이메일을 입력하세요.';
  else return emailRegex.test(s) ? '' : '이메일의 형식이 올바르지 않습니다.' 
}
const getPwError = (s: string) => {
  if (!s) return '비밀번호를 입력하세요.';
  else return pwRegex.test(s) ? '' : '비밀번호는 영소문자, 숫자, 특수문자 포함 8자 이상이어야 합니다.';
}
const getPhoneError = (s: string) => {
  if (!s) return '전화번호를 입력하세요.';
  else return phoneRegex.test(s) ? '' : '전화번호의 형식이 올바르지 않습니다.' 
}
const getPwConfirmError = (pw: string, pwC: string) =>
  pw == pwC ? '' : '비밀번호가 일치하지 않습니다.';
const getNickError = (s: string) =>
  s ? '' : '닉네임을 입력하세요.';

/*const doEmailValidation = (s:string) => {
}
const doNickValidation = (s:string) => {
}
const doPhoneValidation = (s:string) => {
}*/

function SignUpModal({onRegister}: SignUpModalProps) {
  const [[email, setEmail], [emailError, setEmailError]] = [useState(''), useState('')];
  const [[pw, setPw], [pwError, setPwError]] = [useState(''), useState('')];
  const [[pwConfirm, setPwConfirm], [pwConfirmError, setPwConfirmError]] = [useState(''), useState('')];
  const [[nick, setNick], [nickError, setNickError]] = [useState(''), useState('')];
  const [[phone, setPhone], [phoneError, setPhoneError]] = [useState(''), useState('')];

  const [imagePath, setImagePath] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [emailDoubleChkSuccess, setEmailDoubleChkSuccess] = useState(false);
  const [nickDoubleChkSuccess, setNickDoubleChkSuccess] = useState(false);
  const [phoneDoubleChkSuccess, setPhoneDoubleChkSuccess] = useState(false);

  return (
  <RootContainer>
  <LoginModal width='784px' height='1027px'>
    <Space />
    <ImageAdd>
      <ImageAddInput 
        type="file"
        ref={imageInputRef}
        onChange={(e) => {
          setImagePath(e.target.value)
          console.log('Image Path: ' + e.target.value);
        }}
        />
      <ImageAddBtn onClick={() => imageInputRef.current?.click()} />
    </ImageAdd>

    <Space />
    <Login.doubleCheck 
      title='E-mail'
      value='comento@mentos.com 형식으로 입력해주세요.'
      errorMessage={emailError}
      onChange={(s) => {
        setEmailDoubleChkSuccess(false);
        setEmail(s);
        setEmailError(getEmailError(s));
      }}
      onDoubleCheckClick={(s) => {
        const err = getEmailError(s);
        if (!err) {
          /* 
            /user/signup/idCheck
            userEmail=f@f.f
            {checkId=True}
          */
          alert('success email');
          setEmailDoubleChkSuccess(true);
        }
        setEmailError(err);
      }}
      />

    <Login.password 
      title='Password'
      value='영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요.'
      errorMessage={pwError}
      onChange={(s) => {
        setPw(s);
        setPwError(getPwError(s));
        setPwConfirmError(getPwConfirmError(s, pwConfirm));
    }
      }
      />

    <Login.password 
      title='Password Confirmation'
      value='비밀번호를 다시 입력해주세요.' 
      errorMessage={pwConfirmError}
      onChange={(s) => {
        setPwConfirm(s);
        setPwConfirmError(getPwConfirmError(pw, s));
      }}
      />

    <Login.doubleCheck
      title='Nickname'
      value='닉네임을 입력해주세요.'
      errorMessage={nickError}
      onChange={(s) => {
        setNick(s);
        setNickError(getNickError(s));
        setNickDoubleChkSuccess(false);
      }}
      onDoubleCheckClick={(s) => {
        const err = getNickError(s);
        if (!err) {
          /* 
            /user/signup/nickCheck
            userNickname=nickname
            {checkNickname=True}
          */
          alert('nick success');
        setNickDoubleChkSuccess(true);
        }
        setNickError(err);
      }}
      />

    <Login.doubleCheck 
      title='Phone Number' 
      value='- 제외 휴대폰 번호를 입력해주세요.' 
      errorMessage={phoneError}
      onChange={(s) => {
        setPhone(s);
        setPhoneError(getPhoneError(s));
        setPhoneDoubleChkSuccess(false);
      }}
      onDoubleCheckClick={(s) => {
        const err = getPhoneError(s);
        if (!err) {
          /* 
            /user/signup/phoneCheck
            userPhoneName=01099998888 (문서에는 -포함, 디자인에는 -미포함)
            {checkPhoneNum=True}
          */
          alert('phone sucess');
          setPhoneDoubleChkSuccess(true);
        }
        setPhoneError(err);
      }}
      />

    <BigSpace />
    <div onClick={() => {
      let allFine = true;

      if (emailError || pwError || pwConfirmError || nickError || phoneError)
        allFine = false;

      const pwErr = getPwError(pw);
      if (pwErr) {
        setPwError(pwErr);
        allFine = false;
      }

      if (!emailDoubleChkSuccess) {
        setEmailError('이메일 중복확인이 필요합니다.');
        allFine = false;
      } if (!nickDoubleChkSuccess) {
        setNickError('닉네임 중복확인이 필요합니다.');
        allFine = false;
      } if (!phoneDoubleChkSuccess) {
        setPhoneError('전화번호 중복확인이 필요합니다.');
        allFine = false;
      }
      if (!allFine)
        return;

      const response = onRegister(email, pw, nick, phone);
      if (!(response.success)) {
        alert('fail')
      } else alert('success');
      }}>
        <Button long>동의하고 가입하기</Button>
    </div>

    <AgreeText>## 이용 약관, 개인정보 수집 및 이용, 개인정보 제공 내용을 확인 하였으며, 동의합니다.</AgreeText>
  </LoginModal>
  </RootContainer>)
}
export default SignUpModal;