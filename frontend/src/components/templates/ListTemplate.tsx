import React from 'react';
import styled from 'styled-components';
import QuestionTypeNum from '../organisms/QuestionTypeNum';
import QuestionList from '../organisms/QuestionList';

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
