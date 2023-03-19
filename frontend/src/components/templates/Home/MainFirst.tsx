import React from 'react';
import styled from 'styled-components';
import titleImage from '../../../assets/images/MainFirstTitle.png';
import MainBtns from './MainBtns';

const Title = styled.div`
  font-family: NanumGothic;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleImage = styled.div`
  background: url('${titleImage}');
  background-size: cover;
  width: 916px;
  height: 467px;
  margin-bottom: 30px;
`;

export default function mainFirst() {
  return (
    <Title>
      <TitleImage />
      <MainBtns />
    </Title>
  );
}