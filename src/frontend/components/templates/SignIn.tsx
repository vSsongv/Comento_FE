import React from 'react';
import SignInForm from '../../components/organisms/SignInForm';
import SignLogo from '../../assets/images/SignLogo.png';
import toSignUp from '../../assets/images/signup.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignInContainer = styled.div`
  width: 785px;
  height: 465px;
  position: relative;
  background: white;
  box-shadow: 0 0 10px black;
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
  return (
    <SignInContainer>
      <img style={{ display: 'block', margin: 'auto' }} src={SignLogo} />
      <SignInForm />
      <SignUpImg src={toSignUp} />
      <SignUpLink to='/signup'>회원가입 하기</SignUpLink>
    </SignInContainer>
  );
};

export default SignIn;
