import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

type FaqProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};

const FaqLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6%;
  padding-bottom: 6%;
`;

const FaqContainer = styled.div`
  display: flex;
  margin-top: 49px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border: 1px;
  background-color: #eeecec;
  border-radius: 20px;
  width: 900px;
  flex-direction: column;
`;

const FaqTitleContainer = styled.div`
  display: flex;
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
  margin-bottom: 10px;
`;

function FAQ({ title, children }: FaqProps) {
  const [expanded, setExpand] = useState(false);
  const [choosing, setChoosing] = useState<boolean>(false);

  const onToggle = () => {
    setChoosing(!choosing);
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
        {choosing ? <IoIosArrowUp style={{ height: '30px', width: '30px' }} /> : <IoIosArrowDown style={{ height: '30px', width: '30px' }} />}
      </FaqTitleContainer>
      {expanded && <FaqModal>{children}</FaqModal>}
    </FaqContainer>
  );
}

export default function FAQbox() {
  return (
    <FaqLayout>
      <FaqTitle>자주 묻는 질문</FaqTitle>
      <FAQ title=' 서비스 관련 질문은 어디로 하면 되나요?'> - 페이지 하단에 보이는 &#39;fridayproj2.@gmail.com&#39;으로 해주시면 됩니다.</FAQ>
      <FAQ title=' 질문 시 응답은 얼마나 빨리 오나요?'> - 답변자 매칭까지는 보통 1일에서 3일정도 소요됩니다.</FAQ>
      <FAQ title=' 답변자 권한은 어떻게 얻나요?'> - 프로필 수정 페이지로 이동하셔서, 답변자 권한 요청을 해주시면 됩니다. 이때 간단한 본인 소개와 github링크가 필요합니다.</FAQ>
      <FAQ title=' 질문 등록 후에도 언어를 변경할 수 있나요?'> - 답변자가 매칭되기 전까지는 내 질문 목록의 &#39;매칭 전 질문&#39; 탭에서 언어를 포함한 질문 내용, 사진 추가 모두 가능합니다.</FAQ>
      <FAQ title=' 채팅을 종료하지 않은 채로 채팅방을 나갈 수 있나요?'>
        - 네, 가능합니다. 다시 채팅방으로 돌아가시려면 내 질문 목록, 또는 답변 가능 목록에서 &#39;진행 중 질문&#39; 탭에서 채팅방으로 이동하시면 됩니다.
      </FAQ>
    </FaqLayout>
  );
}
