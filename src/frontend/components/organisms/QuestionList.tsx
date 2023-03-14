import React from 'react';
import styled from 'styled-components';
import { boxShadow } from '../../styles/styleUtil';
import Question from '../molescules/Question';

const QuestionUl = styled.ul`
  width: 40%;
  background-color: white;
  ${boxShadow}
`;

const QuestionList = () => {
  return (
    <QuestionUl>
      <Question></Question>
      <Question></Question>
    </QuestionUl>
  );
};

export default QuestionList;
