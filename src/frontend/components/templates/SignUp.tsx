import React from 'react';
import styled from 'styled-components';
import Button from '../UI/atoms/Button';
import ImageAddForm from '../UI/molescules/ImageAddForm';
import SignLogo from '../../assets/images/SignLogo.png';
import SignUpInputs from '../UI/organisms/SignUpInputs';

const SignUpContainer = styled.div`
  width: 785px;
  height: 1050px;
  background: white;
  box-shadow: 0 0 10px black;
  margin: auto;
  margin-top: 120px;
  padding-top: 50px;
  padding-left: 140px;
  padding-right: 140px;
  text-align: center;
`;

const SignUp = () => {
  return (
    <SignUpContainer>
      <img src={SignLogo} />
      <ImageAddForm />
      <SignUpInputs />
      <Button width={230}>동의하고 가입하기</Button>
    </SignUpContainer>
  );
};

export default SignUp;
