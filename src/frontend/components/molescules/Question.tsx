import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { QuestionContent, userInfo, UserInfoType } from '../../recoil/atom';
import { border } from '../../styles/styleUtil';

interface Props {
  backColor: string;
}

type questionProps = {
  data: QuestionContent;
};

const Li = styled.li<Props>`
  cursor: pointer;
  background-color: ${(props) => props.backColor};
  padding: 15px;
  ${border(2)};
  width: 90%;
  height: 95px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 16px;
  color: black;
  font-family: 'NanumGothic';
`;

const Nick = styled.span`
  font-size: 14px;
  font-weight: 800;
  font-family: 'NanumGothic';
  background: -webkit-linear-gradient(#0037ff, #00aeff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Wrapper = styled.div`
  width: 135px;
  display: flex;
  justify-content: space-between;
`;

const Date = styled.span`
  font-size: 12px;
  color: #909090;
  font-family: 'NanumGothic';
`;

const Lang = styled.span`
  font-size: 12px;
  color: black;
  font-family: 'NanumGothic';
`;

const Question = () => {
  // const Question = (data: questionProps) => {
  const [test, setTest] = useState(true);
  const user = useRecoilValue<UserInfoType>(userInfo);

  return (
    <Li onClick={() => setTest(!test)} backColor={test ? 'white' : '#F5F5F5'}>
      {/* <Title>${data.data.title}</Title>
      {/* TODO: 질문자 모드면 user.email, 답변자면 data.nick */}
      {/*<Nick>{user.nickname}</Nick>
      <Wrapper>
        <Date>{data.data.date}</Date>
        <Lang>{data.data.languages}</Lang>
      </Wrapper> */}
      <Title>s</Title>
      {/* TODO: 질문자 모드면 user.email, 답변자면 data.nick */}
      <Nick>{user.nickname}</Nick>
      <Wrapper>
        <Date>f</Date>
        <Lang>s</Lang>
      </Wrapper>
    </Li>
  );
};

export default Question;
