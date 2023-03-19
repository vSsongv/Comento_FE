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
  margin-bottom: 10rem;
  margin-top: 10rem;
`;

const FaqContainer = styled.div`
  display: flex;
  margin-top: 30px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border: 1px;
  background-color: #EEECEC;
  border-radius: 20px;
  flex-direction: column;
`;

const FaqTitleContainer = styled.div`
  display: flex;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  align-items: center;
  cursor: pointer;
`;

const QuestionTitle = styled.p`
  font-weight: bold;
  font-size: 22px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  text-align: left;
`;

const FaqModal = styled.p`
  font-size: 16px;
  margin-top: 10px;
  margin-left: 2.3rem;
  color: #000;
`;

const Toggle = styled.div`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  cursor: pointer;
`;

const FaqTitle = styled.p`
  font-family: Arial;
  font-weight: bold;
  font-size: 60px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 70px;
`;

function FAQ({title, children}: FaqProps) {
  const [expanded, setExpand] = useState(false);
  const onToggle = () => {
    if(expanded === false) setExpand(true);
    else setExpand(false);
  };
  return(
    <FaqContainer onClick={onToggle}>
      <FaqTitleContainer>
        <QuestionTitle>
          Q.
          {title}
          <div><Toggle/></div>
        </QuestionTitle>
      </FaqTitleContainer>
      {expanded && <FaqModal>{children}</FaqModal>}
    </FaqContainer>
  );
}

export default function FAQbox() {
  return(
    <FaqLayout>
      <FaqTitle>자주 묻는 질문</FaqTitle>
      <FAQ title = " 질문 시 응답은 얼마나 빨리 오나요?">
        멘트 정해주세요
      </FAQ>
      <FAQ title = " 개발에 대해 하나도 모르는데 이용할 수 있나요?">
        가능합니다. 멘트 정해주세요
      </FAQ>
    </FaqLayout>
  );
}