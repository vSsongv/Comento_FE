import React, { useRef } from 'react';
import styled from 'styled-components';
import { border } from '../../styles/styleUtil';
import { Languages } from '../../utils/Languages';
import DropDown from '../molescules/DropDown';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 15%;
  font-size: 16px;
  ${border(2)};
`;

const CurrentList = styled.span`
  justify-content: space-between;
  font-family: 'NanumGothic';
  font-size: 16px;
  font-weight: 800;
  background: -webkit-linear-gradient(#0023a1, #00aeff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LeftWrapper = styled.div`
  /* display: flex; */
  justify-content: space-between;
  background-color: aqua;
`;

const QuestionListTop = () => {
  const languageRef = useRef<string>(Languages[0]);

  return (
    <Container>
      <CurrentList>내 질문 리스트</CurrentList>
      <LeftWrapper>
        <span>매칭 전</span>
        <DropDown languageRef={languageRef} border='' />
      </LeftWrapper>
    </Container>
  );
};

export default QuestionListTop;
