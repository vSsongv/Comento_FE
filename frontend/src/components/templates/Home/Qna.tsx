import React from 'react';
import styled from 'styled-components';
import Sample1 from '../../../assets/images/Sample1.png';

const QnaLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-top: 8%;
  margin-bottom: 3%;
`;

const QnaTitle = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 20%;
  .QNA {
    font-family: 'BHS';
    font-weight: 100;
    font-size: 70px;
    background: linear-gradient(to bottom, #033bff, #00e0ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .Title {
    font-family: 'NanumGothic';
    font-weight: 500;
    font-size: 45px;
    margin-bottom: 3%;
  }
  .Sub {
    font-family: 'NanumGothic';
    font-weight: 100;
    font-size: 25px;
  }
`;

const ExampleImg = styled.div`
  position: absolute;
  margin-top: 15rem;
  right: 25rem;
  width: 740px;
  height: 410px;
  background-image: url(${Sample1});
  background-size: cover;
`;

const FadeTitle = styled.div`
  position: absolute;
  left: 25%;
  margin-top: 35%;
  margin-bottom: 45%;
  font-family: BHS;
  font-weight: 100;
  font-size: 150px;
  color: #efefef;
`;

export default function Qna() {
  return (
    <QnaLayout>
      <QnaTitle>
        <span className='QNA'>Q&#38;A</span>
        <span className='Title'>일단 질문하세요&#33;</span>
        <span className='Sub'>
          검증된 코딩 멘토들과 함께 답을 찾다보면
          <br />
          어느새 나도 코딩 고수&#33;
        </span>
      </QnaTitle>
      <FadeTitle>COMMENTO</FadeTitle>
      <ExampleImg />
    </QnaLayout>
  );
}
