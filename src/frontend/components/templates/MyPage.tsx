import React from 'react';
import styled from 'styled-components';
import { border, boxShadow, mainGradient } from '../../styles/styleUtil';
import MyProfile from '../organisms/MyProfile';
import NickForm from '../organisms/NickForm';
import PwdForm from '../organisms/PwdForm';

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

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 0px 0px 50px;
  ${border(3)}
  align-items: center;
`;

const MyPage = () => {
  return (
    <MyPageContainer>
      <TopGradient />
      <Wrapper>
        <MyProfile />
        <AccountContainer>
          <PwdForm />
          <NickForm />
        </AccountContainer>
      </Wrapper>
    </MyPageContainer>
  );
};

export default MyPage;
