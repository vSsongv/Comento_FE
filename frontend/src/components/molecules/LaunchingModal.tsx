import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import launching from '../../assets/images/launching.png';
import { MdClose } from 'react-icons/md';
import { launchingModalVisibleState } from '../../recoil/atom';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Box = styled.div`
  background-color: white;
  width: 570px;
  height: 230px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const Logo = styled.img`
  margin-top: 14px;
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const Title = styled.p`
  margin-top: 17px;
  font-family: NanumGothic;
  font-weight: bold;
  font-size: 17px;
  color: black;
  text-align: center;
`;

const Description = styled.p`
  margin-top: 13px;
  font-family: NanumGothic;
  font-size: 16px;
  max-width: 400px;
  white-space: pre-wrap;
  color: black;
  text-align: center;
  line-height: 23px;
`;

const XIcon = styled.button`
  border: none;
  position: absolute;
  margin-top: 20px;
  top: 0;
  right: 0;
  padding-right: 25px;
  background-color: transparent;
  cursor: pointer;
`;
const LaunchingModal = () => {
  const setModalVisible = useSetRecoilState(launchingModalVisibleState);

  return (
    <Background>
      <Box>
        <XIcon onClick={() => setModalVisible(false)}>
          <MdClose style={{ padding: '0.1rem', fontSize: '1.5rem' }} />
        </XIcon>
        <Logo src={launching} />
        <Title>런칭 준비 중입니다.</Title>
        <Description>
          보다 나은 서비스 제공을 위하여 기능 준비 중에 있습니다. <br />
          빠른 시일 내에 준비하여 찾아뵙겠습니다.
        </Description>
      </Box>
    </Background>
  );
};

export default LaunchingModal;
