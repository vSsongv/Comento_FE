import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { QuestionContent, questionList, questionType } from '../../recoil/atom';
import { mainGradient } from '../../styles/styleUtil';
import { getQuestionList } from '../../api/mentoringService';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  width: 75%;
  height: 100px;
  border: 1px solid rgb(168, 168, 168);
  border-radius: 20px;
  position: relative;
  margin: auto;
`;

const BottomGradient = styled.div`
  width: 100%;
  border-radius: 0px 0px 20px 20px;
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
  width: 100%;
  height: 70px;
  display: flex;
`;

const TypeButton = styled.button`
  font-family: 'NanumGothic';
  font-size: 14px;
  font-weight: 400;
  border-radius: 20px 20px 0px 0px;
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
  const setType = useSetRecoilState<number>(questionType);
  const setQuestions = useSetRecoilState<QuestionContent[]>(questionList);
  const { role } = useParams();

  const getQuestions = async (qType: number): Promise<void> => {
    setType(qType);
    if (role) {
      const questions = await getQuestionList(qType, 1, role);
      if (typeof questions !== 'boolean') {
        setQuestions(questions);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        {/* TODO: 질문 개수 */}
        <TypeButton type='button' onClick={() => getQuestions(0)}>
          <QuestionNum>1</QuestionNum>건
        </TypeButton>
        <TypeButton type='button' onClick={() => getQuestions(1)}>
          <QuestionNum>1</QuestionNum>건
        </TypeButton>
        <TypeButton type='button' onClick={() => getQuestions(2)}>
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
