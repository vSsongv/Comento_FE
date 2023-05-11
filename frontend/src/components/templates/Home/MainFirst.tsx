import React from 'react';
import styled from 'styled-components';
import titleImage from '../../../assets/images/MainFirstTitle.png';
import MainBtns from './MainBtns';

const Title = styled.div`
  font-family: 'NanumGothic';
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
`;

const TitleImage = styled.div`
  background: url('${titleImage}');
  background-size: cover;
  width: 915px;
  height: 470px;
  margin-top: 50px;
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
