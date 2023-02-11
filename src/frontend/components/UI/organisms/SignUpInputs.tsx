import React from 'react';
import InputForm from '../molescules/InputForm';

const SignUpInputs = () => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <InputForm label='E-mail' purpose='email' placeholder='comento@mentos.com 형식으로 입력해주세요.' option='중복확인' />
      <InputForm label='Password' purpose='password' placeholder='영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요..' option='비밀번호확인' />
      <InputForm label='Password Confirmation' purpose='password_confirm' placeholder='비밀번호를 다시 입력해주세요.' option='비밀번호확인' />
      <InputForm label='Nickname' purpose='nickname' placeholder='닉네임을 입력해주세요.' option='중복확인' />
      <InputForm label='Phone Number' purpose='phone' placeholder='- 제외 휴대폰 번호를 입력해주세요.' option='중복확인' />
    </div>
  );
};

export default SignUpInputs;
