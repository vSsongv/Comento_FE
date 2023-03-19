import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { QuestionContent, questionList } from '../../recoil/atom';
import { boxShadow } from '../../styles/styleUtil';
import Question from '../molescules/Question';

const Container = styled.div`
  width: 40%;
  height: 550px;
  margin-top: 30px;
  background-color: white;
  overflow: auto;
  box-shadow: ${boxShadow};
`;

const QuestionList = () => {
  const questions = useRecoilValue<QuestionContent[]>(questionList);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <Container>
      <ul>
        {questions &&
          questions.map((question) => {
            return <Question key={question.mentoringId} data={question} />;
          })}
      </ul>
    </Container>
  );
};

export default QuestionList;
