import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import { Background } from '../atoms/ImageViewModal';

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
  margin-bottom: 20px;
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
