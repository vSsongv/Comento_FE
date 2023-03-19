import React from 'react';
import styled from 'styled-components';

const MainMentosLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
  margin-bottom: 3rem;
`;

const MainMentosBoard = styled.div`
  display: flex;
  width: 874px;
  height: 470px;
  background-color: #F9FBFD;
  box-shadow: 3px 3px 3px 3px #E9E9E9;
`;

const BoardTitleLayout = styled.div`
  display: flex;
  position: absolute;
  margin-top: 15px;
`;

const BoardTitle = styled.p`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding-left: 30px;
  font-weight: 100;
  font-size: 30px;
`;

const MentosPrice = styled.div`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: row;
  padding-top: 50px;
  padding-left: 30px;
  .PriceNumber{
    font-weight: bold;
    font-size: 50px;
  }
  .PriceMonth{
    font-family: Nanumgothic;
    font-weight: 100;
    font-size: 20px;
    color: #7e7e7e;
    padding-top: 27px;
    padding-left: 10px;
  }
`;

export default function MainMentos() {
  return(
    <MainMentosLayout>
      <MainMentosBoard>
        <BoardTitleLayout>
          <BoardTitle>MainMentos</BoardTitle>
          <MentosPrice>
            <span className='PriceNumber'>20</span>
            <span className='PriceMonth'>만원 / 3개월</span>
          </MentosPrice>
        </BoardTitleLayout>
      </MainMentosBoard>
    </MainMentosLayout>
  )
}