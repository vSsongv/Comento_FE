import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { QuestionContent, questionList, questionType } from '../../recoil/atom';
import { boxShadow } from '../../styles/styleUtil';
import Question from '../molescules/List/Question';
import QuestionListTop from '../molescules/List/QuestionListTop';

const Container = styled.div`
  width: 40%;
  height: 550px;
  background-color: white;
  box-shadow: ${boxShadow};
`;

const List = styled.ul`
  height: 465px;
  overflow: auto;
`;

const EmptyMsg = styled.span`
  font-size: 18px;
  font-family: 'NanumGothic';
  display: block;
  margin-top: 30px;
  text-align: center;
`;

const QuestionList = () => {
  const questions = useRecoilValue<QuestionContent[]>(questionList);
  const type = useRecoilValue<number>(questionType);
  const typeText = ['매칭 전', '진행 중', '완료'];

  return (
    <Container>
      <QuestionListTop />
      {questions.length !== 0 ? (
        <List>
          {questions &&
            questions.map((question) => {
              return <Question key={question.mentoringid} data={question} />;
            })}
        </List>
      ) : (
        <EmptyMsg>{typeText[type]} 질문이 없습니다.</EmptyMsg>
      )}
    </Container>
  );
};

export default QuestionList;
