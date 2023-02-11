import React, { useRef, useEffect } from "react";
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
  // const [language, setLanguage] = useState<string>(Languages[0]);
  const languageRef = useRef<string>(Languages[0]);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const formData: FormData = new FormData();

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const onSubmit = () => {
    if (titleRef.current?.value === "") {
      alert("제목을 입력해주세요.");
      titleRef.current.focus();
      return;
    } else if (contentRef.current?.value === "") {
      alert("내용을 입력해주세요.");
      contentRef.current.focus();
      return;
    } else if (languageRef.current === Languages[0]) {
      alert("질문 언어를 선택해주세요.");
      return;
    }

    const dataSet = {
      userid: 1,
      nickname: "김준하",
      language: Languages.indexOf(languageRef.current),
      title: titleRef.current?.value,
      content: contentRef.current?.value,
    };
    formData.append("data", JSON.stringify(dataSet));

    axios
      .post("//3.37.84.147:8081/mentee/question", formData)
      .then((res) => {
        alert("테스트성공!");
        console.log(res);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <QuestionBox>
      <FormHead />
      <Top>
        <QuestionTitle titleRef={titleRef} />
        <DropDown languageRef={languageRef} />
        <Submit src={SubmitIcon} onClick={onSubmit} />
      </Top>
      <Middle>
        <QuestionContent contentRef={contentRef} />
      </Middle>
      <Bottom>
        <QuestionFile formData={formData} />
      </Bottom>
    </QuestionBox>
  );
}

export default QuestionForm;
