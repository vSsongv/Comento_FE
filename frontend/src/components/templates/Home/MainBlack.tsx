import React from 'react';
import styled from 'styled-components';
import defaultProfile from '../../../assets/images/defaultProfile.svg';

const BlackLayout = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 10rem;
  background-color: #000000;
`;

const BlackTitle = styled.p`
  font-family: BHS;
  font-weight: 100;
  font-size: 50px;
  color: #ffffff;
  text-align: center;
  margin-top: 100px;
  .gradient {
    background: linear-gradient(to bottom, #033bff, #00e0ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-family: BHS;
  }
`;

const ContainerLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PersonContainer = styled.div`
  width: 350px;
  height: 350px;
  display: flex;
  margin-top: 70px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 100px;
  padding-top: 4rem;
  align-items: center;
  border: 2rem;
  background-color: #ffffff;
  flex-direction: column;
`;

const Personimg = styled.div`
  background-image: url(${defaultProfile});
  border: none;
  width: 170px;
  height: 170px;
  background-size: contain;
`;

const PersonFont = styled.p`
  font-family: BHS;
  font-weight: 100;
  font-size: 30px;
  text-align: center;
  padding-top: 48px;
`;

export default function MainBlack() {
  return (
    <BlackLayout>
      <BlackTitle>
        혼자 고민하지 말고,
        <span className='gradient'> 코멘토</span>와 함께
      </BlackTitle>
      <ContainerLayout>
        <PersonContainer>
          <Personimg />
          <PersonFont>구글링에 지친 사람</PersonFont>
        </PersonContainer>
        <PersonContainer>
          <Personimg />
          <PersonFont>명확한 답을 얻고 싶은 사람</PersonFont>
        </PersonContainer>
        <PersonContainer>
          <Personimg />
          <PersonFont>1 : 1 멘토링이 필요한 사람</PersonFont>
        </PersonContainer>
      </ContainerLayout>
    </BlackLayout>
  );
}
