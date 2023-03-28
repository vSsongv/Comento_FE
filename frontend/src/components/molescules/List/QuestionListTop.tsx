import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { questionType } from '../../../recoil/atom';
import { border } from '../../../styles/styleUtil';
import { Languages } from '../../../utils/Languages';
import DropDown from '../../molescules/DropDown';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
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
  padding-left: 20px;
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

const TypeText = styled.span`
  display: block;
  margin-left: 30px;
`;

const QuestionListTop = () => {
  const languageRef = useRef<string>(Languages[1]);
  const typeNum = useRecoilValue<number>(questionType);
  const { role } = useParams();

  return (
    <Container>
      <CurrentList>{role === 'mentee' ? '내 질문 리스트' : '답변 가능 질문 리스트'}</CurrentList>
      <LeftWrapper>
        <TypeText>{typeNum === 0 ? '매칭 전 질문' : typeNum === 1 ? '진행 중 질문' : '완료된 질문'}</TypeText>
        <DropDown languageRef={languageRef} border='3' width={150} />
      </LeftWrapper>
    </Container>
  );
};

export default QuestionListTop;
