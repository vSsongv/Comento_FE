import React, { useState } from 'react';
import styled from 'styled-components';
import { border } from '../../styles/styleUtil';

interface Props {
  backColor: string;
}

const Li = styled.li<Props>`
  cursor: pointer;
  background-color: ${(props) => props.backColor};
  padding: 15px;
  ${border(2)};
  width: 100%;
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
  const [test, setTest] = useState(true);
  return (
    <Li onClick={() => setTest(!test)} backColor={test ? 'white' : '#F5F5F5'}>
      <Title>이거 어떻게 구현해야 할까요?</Title>
      <Nick>Ssong</Nick>
      <Wrapper>
        <Date>2023.03.25</Date>
        <Lang>Java Script</Lang>
      </Wrapper>
    </Li>
  );
};

export default Question;
