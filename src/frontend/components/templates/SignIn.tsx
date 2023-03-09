import React, { useState } from 'react';
import SignInForm from '../../components/organisms/SignInForm';
import SignLogo from '../../assets/images/SignLogo.png';
import toSignUp from '../../assets/images/signup.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { boxShadow } from '../../styles/styleUtil';

const SignInContainer = styled.div`
  width: 785px;
  height: 465px;
  position: relative;
  background: white;
  box-shadow: ${boxShadow};
  margin: auto;
  margin-top: 120px;
  padding-top: 50px;
  padding-left: 140px;
  padding-right: 140px;
`;

const SignUpLink = styled(Link)`
  font-family: 'NanumGothic';
  cursor: pointer;
  text-decoration: none;
  color: black;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 20px;
  margin-left: 50px;
`;

const SignUpImg = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const SignIn = () => {
  const [keepSignIn, setKeepSignIn] = useState<boolean>(false);

  const KeepUser = () => {
    setKeepSignIn(!keepSignIn);
  };

  return (
    <SignInContainer>
      <img style={{ display: 'block', margin: 'auto' }} src={SignLogo} />
      <SignInForm />
      <label style={{ position: 'absolute', bottom: '140px' }}>
        <input style={{ cursor: 'pointer', marginRight: '5px' }} checked={keepSignIn} onChange={KeepUser} type='checkbox' name='color' value='saveUserInfo' />
        로그인 상태 유지
      </label>
      <SignUpImg src={toSignUp} />
      <SignUpLink to='/signup'>회원가입 하기</SignUpLink>
    </SignInContainer>
  );
};

export default SignIn;
