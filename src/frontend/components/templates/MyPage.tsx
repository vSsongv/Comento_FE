import React from 'react';
import styled from 'styled-components';
import { boxShadow, mainGradient } from '../../styles/styleUtil';
import MyPageForm from '../organisms/MyPageForm';
import MyPageProfile from '../organisms/MyPageProfile';

const MyPageContainer = styled.div`
  width: 895px;
  height: 1085px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 55px;
  box-shadow: ${boxShadow};
  background: white;
  position: relative;
  margin: auto;
  margin-top: 70px;
  padding-top: 70px;
`;

const TopGradient = styled.div`
  position: absolute;
  top: 0;
  width: 895px;
  height: 30px;
  ${mainGradient};
`;

const MyPage = () => {
  return (
    <MyPageContainer>
      <TopGradient />
      <MyPageProfile />
      <MyPageForm />
    </MyPageContainer>
  );
};

export default MyPage;
