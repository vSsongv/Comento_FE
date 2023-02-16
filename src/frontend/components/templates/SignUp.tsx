import React from 'react';
import styled from 'styled-components';
import ImageAddForm from '../molescules/ImageAddForm';
import SignLogo from '../../assets/images/SignLogo.png';
import SignUpForm from '../organisms/SignUpForm';

const SignUpContainer = styled.div`
  width: 785px;
  height: 1050px;
  background: white;
  box-shadow: 0 0 10px black;
  margin: auto;
  position: relative;
  margin-top: 120px;
  padding-top: 50px;
  padding-left: 140px;
  padding-right: 140px;
`;

const UserTerms = styled.span`
  font-family: 'NanumGothic';
  color: #858585;
  position: absolute;
  left: 0;
  margin-left: 110px;
`;

const SignUp = () => {
  return (
    <SignUpContainer>
      <img style={{ display: 'block', margin: 'auto' }} src={SignLogo} />
      <ImageAddForm />
      <SignUpForm />
      <UserTerms># 이용 약관, 개인정보 수집 및 이용, 개인정보 제공 내용을 확인 하였으며, 동의합니다.</UserTerms>
    </SignUpContainer>
  );
};

export default SignUp;
