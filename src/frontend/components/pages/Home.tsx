import React from "react";
import Button from "../UI/atoms/Button";
import MainFirst from './Home/MainFirst';
import FAQbox from "./Home/FAQbox";
import MainAdvantage from "./Home/MainAdvantage";
import MainBlack from "./Home/MainBlack";
import MainMentos from "./Home/MainMentos";
import MainPush from "./Home/MainPush";
import Qna from "./Home/Qna";


function Home() {
  return (
    <div>
      <MainFirst />
      <MainBlack />
      <MainMentos />
      <FAQbox />
    </div>
  );
}

export default Home;
