import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { QuestionContent, questionList, questionType } from '../../recoil/atom';
import { mainGradient } from '../../styles/styleUtil';
import { getAnswerList } from '../../api/mentorService';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  width: 850px;
  height: 100px;
  border: 1px solid rgb(168, 168, 168);
  border-radius: 10px;
  position: relative;
  margin: auto;
`;

const BottomGradient = styled.div`
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  height: 30px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${mainGradient};
`;

const Type = styled.span`
  font-family: 'NanumGothic';
  font-size: 12px;
  font-weight: 400;
  color: white;
`;

const Wrapper = styled.div`
  width: 848px;
  height: 70px;
  display: flex;
`;

const TypeButton = styled.button`
  font-family: 'NanumGothic';
  font-size: 14px;
  font-weight: 400;
  border-radius: 10px 10px 0px 0px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex: 1;
  :hover {
    border: 2px solid ${colors.firstColor};
  }
`;

const QuestionNum = styled.span`
  font-family: 'NanumGothic';
  font-size: 18px;
  font-weight: 600;
  margin-right: 5px;
`;

const QuestionTypeNum = () => {
  const [type, setType] = useRecoilState<number>(questionType);
  const setQuestions = useSetRecoilState<QuestionContent[]>(questionList);
  const { role } = useParams();

  const getAnswers = async (qType: number): Promise<void> => {
    setType(qType);
    console.log('sdfsd', type);
    const questions = role === 'mento' ? await getAnswerList(qType, 1) : await getAnswerList(qType, 1);
    if (typeof questions !== 'boolean') {
      setQuestions(questions);
    }
  };

  return (
    <Container>
      <Wrapper>
        {/* TODO: 질문 개수 */}
        <TypeButton type='button' onClick={() => getAnswers(0)}>
          <QuestionNum>1</QuestionNum>건
        </TypeButton>
        <TypeButton type='button' onClick={() => getAnswers(1)}>
          <QuestionNum>1</QuestionNum>건
        </TypeButton>
        <TypeButton type='button' onClick={() => getAnswers(2)}>
          <QuestionNum>1</QuestionNum>건
        </TypeButton>
      </Wrapper>
      <BottomGradient>
        <Type>매칭 전</Type>
        <Type>진행 중</Type>
        <Type>완료</Type>
      </BottomGradient>
    </Container>
  );
};

export default QuestionTypeNum;
