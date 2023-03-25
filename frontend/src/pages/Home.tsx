import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FAQbox from '../components/templates/Home/FAQbox';
import MainAdvantage from '../components/templates/Home/MainAdvantage';
import MainBlack from '../components/templates/Home/MainBlack';
import { AiOutlineArrowUp } from 'react-icons/ai';
import MainFirst from '../components/templates/Home/MainFirst';
import MainMentos from '../components/templates/Home/MainMentos';
import MainPush from '../components/templates/Home/MainPush';
import Qna from '../components/templates/Home/Qna';
import { useRecoilValue } from 'recoil';
import { modalVisibleState } from '../recoil/atom';
import LaunchingModal from '../components/molescules/LaunchingModal';

const BackgroundColor = styled.div`
  background-color: #ffffff;
`;

const ScrollOnTop = styled.button`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 85%;
  right: 3%;
  z-index: 100;
  width: 73px;
  height: 73px;
  border: 3px solid #e2e2e2;
  border-radius: 50%;
  align-items: center;
  padding-top: 5px;
  background-color: #ffffff;
  cursor: pointer;
`;

const ArrowUp = styled(AiOutlineArrowUp)`
  font-size: 25px;
`;

const TopFont = styled.p`
  color: #000000;
  font-size: 20px;
  font-weight: bold;
`;

export default function Home() {
  const [showBtn, setShowBtn] = useState(false);
  const modalVisible = useRecoilValue<boolean>(modalVisibleState);

  const scrolltoTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const ShowBtnClick = () => {
      if (window.scrollY > 100) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener('scroll', ShowBtnClick);
    return () => {
      window.removeEventListener('scroll', ShowBtnClick);
    };
  }, []);

  return (
    <BackgroundColor>
      {showBtn && (
        <>
          <ScrollOnTop onClick={scrolltoTop} type='button'>
            <ArrowUp />
            <TopFont>Top</TopFont>
          </ScrollOnTop>
        </>
      )}
      <MainFirst />
      <MainBlack />
      <Qna />
      <MainAdvantage />
      <MainPush />
      <MainMentos />
      <FAQbox />
      {modalVisible ? <LaunchingModal /> : null}
    </BackgroundColor>
  );
}
