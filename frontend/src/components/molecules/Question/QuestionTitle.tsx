import React, { RefObject } from 'react';
import styled from 'styled-components';
import { border } from '../../../styles/styleUtil';

const Title = styled.p`
  display: flex;
  align-items: center;
  margin: 0 3%;
`;

const TitleInput = styled.input`
  height: 60%;
  width: 55%;
  font-size: 16px;
  padding: 0.5rem;
  border: none;
  ${border(2)}
  &:focus {
    border-bottom: solid 1px;
  }
`;

interface Props {
  titleRef: RefObject<HTMLInputElement>;
}

const QuestionTitle = ({ titleRef }: Props) => {
  return (
    <>
      <Title>제목</Title>
      <TitleInput ref={titleRef} placeholder='ex) c언어 포인터 관련 질문' />
    </>
  );
};

export default QuestionTitle;
