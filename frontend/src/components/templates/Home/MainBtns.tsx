import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../atoms/Button';
import arrowImage from '../../../assets/images/MainFirstButtonArrow.png';

const RowBtn = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainBtnLink = styled(Link)`
  padding-top: 10px;
  width: 350px;
  height: 77px;
  display: flex;
`;

const MainBtnStyle = styled(Button)`
  padding-top: 10px;
  height: 77px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 30px;
`;

const StartLabel = styled.p`
  font-size: 10pt;
`;

const BtnLabel = styled.p`
  font-size: 20pt;
`;

const BtnContainer = styled.div`
  padding-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ArrowImg = styled.div`
  margin-left: 10px;
  background: url('${arrowImage}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 10px;
  height: 17px;
`;

export default function MainBtns() {
  return (
    <RowBtn>
      <MainBtnLink to='/question'>
        <MainBtnStyle width={350}>
          <StartLabel>지금, 질문 시작해보세요!</StartLabel>
          <BtnContainer>
            <BtnLabel>질문하기</BtnLabel>
            <ArrowImg />
          </BtnContainer>
        </MainBtnStyle>
      </MainBtnLink>
      <MainBtnLink to='/questionList/mentor'>
        <MainBtnStyle width={350}>
          <StartLabel>지금, 답변 시작해보세요!</StartLabel>
          <BtnContainer>
            <BtnLabel>답변하기</BtnLabel>
            <ArrowImg />
          </BtnContainer>
        </MainBtnStyle>
      </MainBtnLink>
    </RowBtn>
  );
}
