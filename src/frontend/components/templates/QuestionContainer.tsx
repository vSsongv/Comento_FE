import React from "react";
import styled from "styled-components";
import QuestionForm from "../UI/organisms/QuestionForm";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
`;

function QuestionContainer() {
  return (
    <Container>
      <QuestionForm></QuestionForm>
    </Container>
  );
}

export default QuestionContainer;
