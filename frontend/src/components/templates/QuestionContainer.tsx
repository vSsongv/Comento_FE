import React from 'react';
import styled from 'styled-components';
import QuestionForm from '../organisms/QuestionForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`;

const QuestionContainer = () => {
  return (
    <Container>
      <QuestionForm />
    </Container>
  );
};

export default QuestionContainer;
