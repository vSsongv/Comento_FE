import React from 'react';
import styled from 'styled-components';
import { boxShadow } from '../../styles/styleUtil';

const QuestionDetailContainer = styled.div`
  width: 43vw;
  height: 100%;
  background-color: white;
  box-shadow: ${boxShadow};
`;

const QuestionDetail = () => {
  return <QuestionDetailContainer></QuestionDetailContainer>;
};

export default QuestionDetail;
