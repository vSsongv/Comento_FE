import React from 'react';
import InputForm from '../molescules/InputForm';

const SignInInputs = () => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <InputForm label='E-mail' purpose='email' placeholder='comento@mentos.com 형식으로 입력해주세요.' option='중복확인' />
      <InputForm label='Password' purpose='password' placeholder='영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요..' option='비밀번호확인' />
    </div>
  );
};

export default SignInInputs;
