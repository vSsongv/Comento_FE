import React from 'react';
import styled from 'styled-components';
import QuestionList from '../organisms/QuestionList';
import QuestionTypeNum from '../organisms/QuestionTypeNum';

const Container = styled.div`
  background-color: white;
  width: 90%;
  padding: 50px;
  margin: auto;
  margin-top: 60px;
`;

const ListTemplate = () => {
  return (
    <Container>
      <QuestionTypeNum></QuestionTypeNum>
      <QuestionList></QuestionList>
    </Container>
  );
};

export default ListTemplate;
