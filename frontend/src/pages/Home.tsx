import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FAQbox from '../components/templates/Home/FAQbox';
import MainAdvantage from '../components/templates/Home/MainAdvantage';
import MainBlack from '../components/templates/Home/MainBlack';
import MainBtns from '../components/templates/Home/MainBtns';
import MainFirst from '../components/templates/Home/MainFirst';
import MainMentos from '../components/templates/Home/MainMentos';
import MainPush from '../components/templates/Home/MainPush';
import Qna from '../components/templates/Home/Qna';

const ScrollBtn = styled.div`
  position: fixed;
  top: 80%;
  left: 37%;
  right: 37%;
`;

export default function Home() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const ShowBtnClick = () => {
      if (window.scrollY > 500) {
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
    <div>
      {showBtn && (
        <div>
          <ScrollBtn>
            <MainBtns />
          </ScrollBtn>
        </div>
      )}
      <MainFirst />
      <MainBlack />
      <Qna />
      <MainAdvantage />
      <MainPush />
      <MainMentos />
      <FAQbox />
    </div>
  );
}
