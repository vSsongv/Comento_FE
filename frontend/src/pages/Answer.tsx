import React from 'react';
import styled from 'styled-components';

const BoxContainer = styled.div`
  width: 1180px;
  height: 593px;
  margin: auto;
  display: flex;
`;

const QuestionListContainer = styled.div`
  width: 405px;
  height: 595px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: green;
  margin-top: 50px;
`;

const ListInfo = styled.div`
  width: 405px;
  height: 55px;
  background-color: aqua;
`;

const QuestionContainer = styled.div`
  width: 735px;
  height: 595px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: yellow;
  margin-top: 50px;
`;

const QuestionInfo = styled.div`
  width: 735px;
  height: 75px;
  background-color: olive;
`;

function Answer() {
  return (
    <>
      <BoxContainer>
        <QuestionListContainer>
          <ListInfo></ListInfo>
        </QuestionListContainer>
        <QuestionContainer>
          <QuestionInfo></QuestionInfo>
        </QuestionContainer>
      </BoxContainer>
    </>
  );
}

export default Answer;
