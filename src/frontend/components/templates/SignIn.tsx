import React from 'react';
import Button from '../UI/atoms/Button';
import SignLogo from '../../assets/images/SignLogo.png';
import SignInInputs from '../UI/organisms/SignInInputs';
import styled from 'styled-components';

const SignInContainer = styled.div`
  width: 785px;
  height: 465px;
  background: white;
  box-shadow: 0 0 10px black;
  margin: auto;
  margin-top: 120px;
  padding-top: 50px;
  padding-left: 140px;
  padding-right: 140px;
  text-align: center;
`;

const SignIn = () => (
  <SignInContainer>
    <img src={SignLogo} />
    <SignInInputs />
    <Button width={180}>로그인</Button>
  </SignInContainer>
);

export default SignIn;
