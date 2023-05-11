import React from 'react';
import styled from 'styled-components';

const MainMentosLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6%;
`;

const MainMentosBoard = styled.div`
  display: flex;
  width: 874px;
  height: 470px;
  background-color: #f9fbfd;
  box-shadow: 5px 5px 5px 5px #e9e9e9;
`;

const BoardTitleLayout = styled.div`
  display: flex;
  position: absolute;
  margin-top: 38px;
  margin-left: 43px;
`;

const BoardTitle = styled.p`
  display: flex;
  flex-direction: column;
  position: absolute;
  font-weight: bold;
  font-size: 50px;
`;

const MentosPrice = styled.div`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: row;
  margin-top: 60px;
  .PriceNumber {
    font-weight: bold;
    font-size: 60px;
  }
  .PriceMonth {
    font-family: Nanumgothic;
    font-weight: 100;
    font-size: 20px;
    color: #7e7e7e;
    padding-top: 40px;
    padding-left: 10px;
  }
`;

export default function MainMentos() {
  return (
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
  );
}
