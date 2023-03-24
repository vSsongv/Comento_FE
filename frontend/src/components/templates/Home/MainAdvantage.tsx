import React from 'react';
import styled from 'styled-components';
import MainAdvantage_approval from '../../../assets/images/MainAdvantage_approval.png';
import MainAdvantage_idea from '../../../assets/images/MainAdvantage_idea.png';
import MainAdvantage_rocket from '../../../assets/images/MainAdvantage_rocket.png';

const MainAdLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70rem;
  margin-bottom: 3rem;
`;

const MainAdTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .SmallTitle {
    font-family: BHS;
    font-weight: 100;
    font-size: 50px;
    color: #898787;
    text-align: center;
  }
  .BigTitle {
    font-family: BHS;
    font-weight: 100;
    font-size: 70px;
    background: linear-gradient(to bottom, #033bff, #00e0ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-align: center;
  }
`;

const AdContainerLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AdContainer = styled.div`
  width: 500px;
  height: auto;
  display: flex;
  margin-top: 100px;
  align-items: center;
  border: 0;
  background-color: transparent;
  flex-direction: column;
`;

const ContainerImg = styled.div`
  .Approval {
    background-image: url(${MainAdvantage_approval});
    border: none;
    width: 120px;
    height: 120px;
    background-size: cover;
  }
  .Idea {
    background-image: url(${MainAdvantage_idea});
    border: none;
    width: 120px;
    height: 120px;
  }
  .Rocket {
    background-image: url(${MainAdvantage_rocket});
    background-size: cover;
    border: none;
    width: 120px;
    height: 120px;
  }
`;

const ContainerFont = styled.p`
  display: flex;
  text-align: center;
  .title {
    font-family: 'NanumGothic';
    font-weight: bold;
    font-size: 35px;
    padding-top: 50px;
  }
  .sub {
    font-family: 'NanumGothic';
    font-weight: 300;
    font-size: 25px;
    padding-top: 10%;
  }
`;

export default function MainAdvantage() {
  return (
    <MainAdLayout>
      <MainAdTitle>
        <span className='SmallTitle'>언제 어디서든</span>
        <span className='BigTitle'>코멘토와 1 : 1 맞춤 코칭</span>
      </MainAdTitle>
      <AdContainerLayout>
        <AdContainer>
          <ContainerImg>
            <div className='Approval' />
          </ContainerImg>
          <ContainerFont>
            <span className='title'>맞춤형 답변!</span>
          </ContainerFont>
          <ContainerFont>
            <span className='sub'>
              1대 1매칭 형식으로<br></br> 맞춤형 답을 얻을 수 있습니다.
            </span>
          </ContainerFont>
        </AdContainer>
        <AdContainer>
          <ContainerImg>
            <div className='Idea' />
          </ContainerImg>
          <ContainerFont>
            <span className='title'>원하는 질문을 정확히!</span>
          </ContainerFont>
          <ContainerFont>
            <span className='sub'>
              원하는 질문,키워드에<br></br>집중해서 질문할 수 있습니다.
            </span>
          </ContainerFont>
        </AdContainer>
        <AdContainer>
          <ContainerImg>
            <div className='Rocket' />
          </ContainerImg>
          <ContainerFont>
            <span className='title'>채팅 형식으로 빠르게!</span>
          </ContainerFont>
          <ContainerFont>
            <span className='sub'>
              채팅 방식으로 언제든 <br></br> 빠르게 답변을 받을 수 있습니다.
            </span>
          </ContainerFont>
        </AdContainer>
      </AdContainerLayout>
    </MainAdLayout>
  );
}
