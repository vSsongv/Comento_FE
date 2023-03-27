import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

const Background = styled.div`
  //TODO: atoms에서 가져다가 쓰기
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 4rem 8rem 3rem 8rem;
  background-color: white;
`;

const H1 = styled.h1`
  font-weight: 700;
  font-size: 15px;
  margin: 1rem;
`;

const P = styled.p`
  font-weight: 400;
  font-size: 13px;
`;

interface Props {
  completeQuestion: () => void;
}

const SubmitCompleteModal = ({ completeQuestion }: Props) => {
  return (
    <Background>
      <Container>
        <H1>질문이 정상적으로 제출되었습니다.</H1>
        <P>답변자 매칭에는 시간이 소요되오니 이해 부탁드립니다.</P>
        <Button width={75} height={35} fontSize={13} onClick={completeQuestion}>
          확인
        </Button>
      </Container>
    </Background>
  );
};

export default SubmitCompleteModal;
