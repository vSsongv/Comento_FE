import React from 'react';
import styled from 'styled-components';
import SignLogo from '../../assets/images/SignLogo.png';
import SignUpForm from '../organisms/SignUpForm';
import { Link } from 'react-router-dom';
import { boxShadow } from '../../styles/styleUtil';

const SignUpContainer = styled.div`
  width: 785px;
  height: 1050px;
  background: white;
  box-shadow: ${boxShadow};
  position: relative;
  margin: 100px auto;
  padding: 50px 140px 0px 140px;
`;

const UserTerms = styled(Link)`
  font-family: 'NanumGothic';
  color: #858585;
  position: absolute;
  left: 0;
  margin-left: 185px;
`;

const SignUp = () => {
  return (
    <SignUpContainer>
      <img style={{ display: 'block', margin: 'auto' }} src={SignLogo} />
      <SignUpForm />
      <UserTerms to='/'># 이용 약관, 개인정보 수집 및 이용, 개인정보 제공 내용 확인</UserTerms>
    </SignUpContainer>
  );
};

export default SignUp;
