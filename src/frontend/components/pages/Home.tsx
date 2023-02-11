import React from 'react';
import MainFirst from './Home/MainFirst';
import FAQbox from './Home/FAQbox';
import MainAdvantage from './Home/MainAdvantage';
import MainBlack from './Home/MainBlack';
import MainMentos from './Home/MainMentos';
import MainPush from './Home/MainPush';
import Qna from './Home/Qna';
import ImageAddForm from '../UI/molescules/ImageAddForm';

function Home() {
  return (
    <div>
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

export default Home;
