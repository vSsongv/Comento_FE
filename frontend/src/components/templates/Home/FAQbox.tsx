import React, { useState } from 'react';
import styled from 'styled-components';

type FaqProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};

const FaqLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6%;
  padding-bottom: 10%;
`;

const FaqContainer = styled.div`
  display: flex;
  margin-top: 49px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border: 1px;
  background-color: #eeecec;
  border-radius: 20px;
  flex-direction: column;
`;

const FaqTitleContainer = styled.div`
  display: flex;
  width: 900px;
  padding: 5px 0px 5px 7px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const QuestionTitle = styled.p`
  font-weight: bold;
  font-size: 25px;
  margin-top: 27px;
  margin-bottom: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  text-align: left;
`;

const FaqModal = styled.p`
  font-size: 18px;
  margin: 0px 0px 20px 10px;
  color: #000;
`;

const Toggle = styled.div`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  margin-right: 10px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  cursor: pointer;
`;

const FaqTitle = styled.p`
  font-family: Arial;
  font-weight: bold;
  font-size: 50px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 70px;
`;

function FAQ({ title, children }: FaqProps) {
  const [expanded, setExpand] = useState(false);
  const onToggle = () => {
    if (expanded === false) setExpand(true);
    else setExpand(false);
  };
  return (
    <FaqContainer onClick={onToggle}>
      <FaqTitleContainer>
        <QuestionTitle>
          Q.
          {title}
        </QuestionTitle>
        <Toggle />
      </FaqTitleContainer>
      {expanded && <FaqModal>{children}</FaqModal>}
    </FaqContainer>
  );
}

export default function FAQbox() {
  return (
    <FaqLayout>
      <FaqTitle>자주 묻는 질문</FaqTitle>
      <FAQ title=' 질문 시 응답은 얼마나 빨리 오나요?'>멘트 정해주세요</FAQ>
      <FAQ title=' 개발에 대해 하나도 모르는데 이용할 수 있나요?'>가능합니다. 멘트 정해주세요</FAQ>
    </FaqLayout>
  );
}
