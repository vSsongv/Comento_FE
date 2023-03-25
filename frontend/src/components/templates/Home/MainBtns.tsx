import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { mainGradient } from '../../../styles/styleUtil';
import arrowImage from '../../../assets/images/MainFirstButtonArrow.png';
import { useRecoilValue } from 'recoil';
import { signInState, userInfo, UserInfoType } from '../../../recoil/atom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
`;

const ArrowImg = styled.div`
  margin-left: 12px;
  margin-top: 7px;
  background: url('${arrowImage}');
  background-repeat: no-repeat;
  background-size: cover;
  width: 10px;
  height: 17px;
`;

const MainBtn = styled.button`
  cursor: pointer;
  width: 480px;
  height: 90px;
  ${mainGradient}
  border: none;
  font-weight: 600;
  border-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  font-family: 'NanumGothic';
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Wrraper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainBtns = () => {
  const UserInfo = useRecoilValue<UserInfoType>(userInfo);
  const isSignIn = useRecoilValue<boolean>(signInState);
  const navigate = useNavigate();

  return (
    <Container>
      {isSignIn && UserInfo.role === 'A' ? (
        <MainBtn onClick={() => navigate('/questionList/mentor')}>
          <p style={{ fontSize: '16px', paddingBottom: '8px' }}>지금, 답변 시작해보세요!</p>
          <Wrraper>
            <p style={{ fontSize: '27px' }}>답변하기</p>
            <ArrowImg />
          </Wrraper>
        </MainBtn>
      ) : (
        <MainBtn onClick={() => navigate('/myPage')}>
          <p style={{ fontSize: '16px', paddingBottom: '8px' }}>지금, 답변 시작해보세요!</p>
          <Wrraper>
            <p style={{ fontSize: '27px' }}>답변 권한 얻으러 가기</p>
            <ArrowImg />
          </Wrraper>
        </MainBtn>
      )}
      <MainBtn onClick={() => navigate('/question')}>
        <p style={{ fontSize: '16px', paddingBottom: '8px' }}>지금, 질문 시작해보세요!</p>
        <Wrraper>
          <p style={{ fontSize: '27px' }}>질문하기</p>
          <ArrowImg />
        </Wrraper>
      </MainBtn>
    </Container>
  );
};

export default MainBtns;
