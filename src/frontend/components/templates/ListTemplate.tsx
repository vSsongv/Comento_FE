import React from 'react';
import styled from 'styled-components';
import { boxShadow } from '../../styles/styleUtil';
import QuestionList from '../organisms/QuestionList';
import QuestionTypeNum from '../organisms/QuestionTypeNum';

interface ListData {
  data: Promise<Element>;
}

const Container = styled.div`
  background-color: white;
  background: white;
  width: 90%;
  padding: 10px;
  margin: auto;
  margin-top: 60px;
  box-shadow: ${boxShadow};
`;

// const ListTemplate = ({ data }: ListData) => {
const ListTemplate = () => {
  // return <QuestionList data={data}></QuestionList>;
  return (
    <Container>
      <QuestionTypeNum></QuestionTypeNum>
      <QuestionList></QuestionList>;
    </Container>
  );
};

export default ListTemplate;
