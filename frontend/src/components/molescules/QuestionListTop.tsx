import React, { useRef } from 'react';
import styled from 'styled-components';
import { border } from '../../styles/styleUtil';
import { Languages } from '../../utils/Languages';
import DropDown from '../molescules/DropDown';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 15%;
  font-size: 16px;
  ${border(2)};
`;

const CurrentList = styled.span`
  font-family: 'NanumGothic';
  font-size: 16px;
  font-weight: 800;
  background: -webkit-linear-gradient(45deg, #0023a1, #00aeff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 60%;
`;

const QuestionListTop = () => {
  const languageRef = useRef<string>(Languages[0]);

  return (
    <Container>
      <CurrentList>내 질문 리스트</CurrentList>
      <LeftWrapper>
        <span style={{ display: 'block', marginLeft: '30px' }}>매칭 전</span>
        <DropDown languageRef={languageRef} border='' width={150} />
      </LeftWrapper>
    </Container>
  );
};

export default QuestionListTop;
