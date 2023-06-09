import React from 'react';
import styled from 'styled-components';
import ChattingRoom from '../organisms/ChattingRoom';
import QuestionDetail from '../organisms/QuestionDetail';

const ChattingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 660px;
  margin: 40px 80px;
`;

const Chatting = () => {
  return (
    <ChattingContainer>
      <QuestionDetail width={45} />
      <ChattingRoom />
    </ChattingContainer>
  );
};

export default Chatting;
