import React, { useRef, SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import ShadowBox from "../atoms/ShadowBox";
import { border } from "../../../styles/styleUtil";
import QuestionTitle from "../molescules/Question/QuestionTitle";
import QuestionContent from "../molescules/Question/QuestionContent";
import QuestionFile from "../molescules/Question/QeustionFile";
import SubmitIcon from "../../../assets/images/QuestionSubmit.svg";
import DropDown from "../molescules/DropDown";
import { Languages } from "../../utils/Languages";
import axios from "axios";

const QuestionBox = styled(ShadowBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  height: 70vh;
  padding: 4vh 3vw;
  padding-bottom: 0;
`;

const FormHead = styled.div`
  width: 70vw;
  height: 5vh;
  margin-top: -4vh;
  background: linear-gradient(
    87.94deg,
    #3c02bb 17.59%,
    #4c51e4 48.07%,
    #01fbfc 121%
  );
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 15%;
  padding: 0.5rem 0;
  font-size: 16px;
  ${border(2)};
`;

const Middle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  padding: 2rem 0;
  ${border(2)};
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 35%;
  padding: 1rem 0;
`;

const Submit = styled.img`
  width: 3.5%;
  margin: 1.5%;
  cursor: pointer;
`;

function QuestionForm() {
  const [language, setLanguage] = useState<string>(Languages[0]);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .post("http://192.168.0.32:8080/mentee/question", {
        userid: 4,
        nickname: "김준하",
        language: Languages.indexOf(language),
        title: titleRef.current?.value,
        content: contentRef.current?.value,
      })
      .then(() => {
        alert("테스트성공!");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("이미 존재하는 게시물입니다.");
        }
      });
  };

  return (
    <QuestionBox>
      <FormHead />
      <Top>
        <QuestionTitle titleRef={titleRef} />
        <DropDown language={language} setLanguage={setLanguage} />
        <Submit src={SubmitIcon} onClick={onSubmit} />
      </Top>
      <Middle>
        <QuestionContent contentRef={contentRef} />
      </Middle>
      <Bottom>
        <QuestionFile />
      </Bottom>
    </QuestionBox>
  );
}

export default QuestionForm;
