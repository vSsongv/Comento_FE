import React, { RefObject } from 'react';
import styled from 'styled-components';
import { border } from '../../../styles/styleUtil';

const Content = styled.p`
  flex: none;
  display: flex;
  margin: 0 3%;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 100%;
  margin-right: 3%;
  resize: none;
  font-size: 16px;
  padding: 0.5rem;
  ${border(0)}
  ${border(1)}
  ${border(2)}
  ${border(3)}
  &:focus {
    border: solid 1px;
  }
`;

interface Props {
  contentRef: RefObject<HTMLTextAreaElement>;
}

const QuestionContent = (props: Props) => {
  return (
    <>
      <Content>내용</Content>
      <ContentInput ref={props.contentRef} placeholder='ex) 25번째 줄의 코드가 왜 실행이 되지 않는지 모르겠어요. 포인터 사용 방식이 잘못된 건가요? (사진은 4장까지 첨부 가능합니다.)' />
    </>
  );
};

export default QuestionContent;
