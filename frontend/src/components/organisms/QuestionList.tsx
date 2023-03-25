import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { QuestionContent, questionList } from '../../recoil/atom';
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

const QuestionList = () => {
  const questions = useRecoilValue<QuestionContent[]>(questionList);

  return (
    <Container>
      <QuestionListTop />
      <List>
        {questions &&
          questions.map((question) => {
            return <Question key={question.mentoringid} data={question} />;
          })}
      </List>
    </Container>
  );
};

export default QuestionList;
