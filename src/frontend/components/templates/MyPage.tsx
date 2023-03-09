import React from 'react';
import styled from 'styled-components';
import { boxShadow, mainGradient } from '../../styles/styleUtil';
import MyAccount from '../organisms/MyAccount';
import MyProfile from '../organisms/MyProfile';

const MyPageContainer = styled.div`
  width: 895px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px 40px;
  box-shadow: ${boxShadow};
  background: white;
  position: relative;
  margin: auto;
  margin-top: 70px;
`;

const TopGradient = styled.div`
  position: absolute;
  top: 0;
  width: 895px;
  height: 30px;
  ${mainGradient};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const MyPage = () => {
  return (
    <MyPageContainer>
      <TopGradient />
      <Wrapper>
        <MyProfile />
        <MyAccount />
      </Wrapper>
    </MyPageContainer>
  );
};

export default MyPage;
