import React from 'react';
import styled from 'styled-components';

import Sample2 from '../../../assets/images/Sample2.png';

const MainPushLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6%;
`;

const MainPushTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  .subTitle {
    font-family: Nanumgothic;
    font-weight: 100;
    font-size: 30px;
    color: #000000;
    text-align: start;
    margin-bottom: 5%;
  }
  .Title {
    font-family: BHS;
    font-weight: 100;
    font-size: 40px;
    background: linear-gradient(to bottom, #033bff, #00e0ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-align: start;
  }
`;

const PushContainerLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PushContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  margin-top: 70px;
  margin-left: 80px;
  margin-bottom: 100px;
  padding-top: 4rem;
  align-items: center;
  border: 2rem;
  background-color: transparent;
  flex-direction: column;
`;

const PushImg = styled.div`
  display: flex;
  background-image: url(${Sample2});
  background-size: cover;
  border: none;
  width: 560px;
  height: 431px;
`;

const PushFontLayout = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const PushFont = styled.p`
  font-weight: bold;
  font-size: 25px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  text-align: left;
`;

const NumberLogo = styled.div`
  width: 50px;
  height: 50px;
  background-color: #000000;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
  color: white;
`;

export default function MainPush() {
  return (
    <MainPushLayout>
      <PushContainerLayout>
        <PushContainer>
          <PushImg />
        </PushContainer>
        <PushContainer>
          <MainPushTitle>
            <span className='subTitle'>
              지금 하는 코딩,&#44;
              <br />
              이런 고민 있지 않나요&#63;
              <PushFontLayout>
                <NumberLogo>1</NumberLogo>
                <PushFont>구글링하다 도저히 못 찾겠어서 포기한 사람&#33;</PushFont>
              </PushFontLayout>
              <PushFontLayout>
                <NumberLogo>2</NumberLogo>
                <PushFont>질문할 곳이 없어 고민하던 사람&#33;</PushFont>
              </PushFontLayout>
              <PushFontLayout>
                <NumberLogo>3</NumberLogo>
                <PushFont>학습 고민을 나눌 수 있는 멘토가 필요한 사람&#33;</PushFont>
              </PushFontLayout>
              <PushFontLayout>
                <NumberLogo>4</NumberLogo>
                <PushFont>계속 반복되던 에러에 지친 사람&#33;</PushFont>
              </PushFontLayout>
              같은 고민을 했다면
            </span>
            <span className='Title'>코멘토를 강력 추천합니다&#33;</span>
          </MainPushTitle>
        </PushContainer>
      </PushContainerLayout>
    </MainPushLayout>
  );
}
