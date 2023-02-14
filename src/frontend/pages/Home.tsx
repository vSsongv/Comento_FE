import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainBtns from '../templates/Home/MainBtns';
import MainFirst from '../templates/Home/MainFirst';
import FAQbox from '../templates/Home/FAQbox';
import MainAdvantage from '../templates/Home/MainAdvantage';
import MainBlack from '../templates/Home/MainBlack';
import MainMentos from '../templates/Home/MainMentos';
import MainPush from '../templates/Home/MainPush';
import Qna from '../templates/Home/Qna';

const ScrollBtn = styled.div`
  position: fixed;
  top: 80%;
  left: 37%;
  right: 37%;
`;

export default function Home() {
  const [showBtn, setShowBtn] = useState(false);
  const scrollBtn = () => {  
    window.scroll({ behavior: 'smooth' })
  }
  useEffect(() => {
    const ShowBtnClick = () => {
      if(window.scrollY > 500){ setShowBtn(true) }
      else{ setShowBtn(false) }
    }
    window.addEventListener("scroll", ShowBtnClick)
    return () => {
      window.removeEventListener("scroll", ShowBtnClick)
    }
  }, [])

  return (
    <div>
      {showBtn && 
        <div>
          <ScrollBtn><MainBtns /></ScrollBtn>
        </div>
      }
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