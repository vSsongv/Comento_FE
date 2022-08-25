import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import * as Login from "../molescules/LoginInputs";
import LoginModal from "../molescules/LoginModal"

const AgreeText = styled.p`
  font-family: NanumGothic;
  font-size: 18px;
  color: #858585;
  margin: 26px 0 50px 0;
`

function SignupModal() {
  /* 여기에 로그인 코드 추가*/
  return (
  <LoginModal width={'784px'} height={'1027px'}>
    <div style={{width: '204px', height: '204px', backgroundColor: '#858585', marginTop: '20px'}}>
      사용자 이미지 부분은 추가예정
    </div>

    <div style={{height: '20px'}} />
    <Login.doubleCheck title='E-mail' value='comento@mentos.com 형식으로 입력해주세요.' />
    <Login.password title='Password' value='영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요.' />
    <Login.password title='Password Confirmation' value='비밀번호를 다시 입력해주세요.' />
    <Login.doubleCheck title='Nickname' value='닉네임을 입력해주세요.' />
    <Login.doubleCheck title='Phone Number' value='- 제외 휴대폰 번호를 입력해주세요.' />

    <div style={{height: '40px'}} />
    <Button>동의하고 가입하기</Button>
    <AgreeText>## 이용 약관, 개인정보 수집 및 이용, 개인정보 제공 내용을 확인 하였으며, 동의합니다.</AgreeText>

  </LoginModal>)
}

export default SignupModal;
