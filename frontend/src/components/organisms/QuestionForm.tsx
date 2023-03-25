import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { border, mainGradient, boxShadow } from '../../styles/styleUtil';
import QuestionTitle from '../molescules/Question/QuestionTitle';
import QuestionContent from '../molescules/Question/QuestionContent';
import QuestionFile from '../molescules/Question/QeustionFile';
import SubmitIcon from '../../assets/images/QuestionSubmit.svg';
import DropDown from '../molescules/DropDown';
import { Languages } from '../../utils/Languages';
import { askQuestion, editQuestion } from '../../api/menteeService';
import { useNavigate, useParams } from 'react-router-dom';
import { GetSpecificQuestion } from '../../api/chattingService';
import SubmitCompleteModal from './SubmitCompleteModal';
import { useRecoilValue } from 'recoil';
import { imageListAtom } from '../../recoil/atom';

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  height: 70vh;
  padding: 4vh 3vw;
  padding-bottom: 0;
  background-color: white;
  box-shadow: ${boxShadow};
`;

const FormHead = styled.div`
  width: 70vw;
  height: 5vh;
  margin-top: -4vh;
  ${mainGradient}
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

const QuestionForm = () => {
  const languageRef = useRef<string>(Languages[0]);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [enrolledImageList, setEnrolledImageList] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [, setGetApi] = useState<boolean>(false);
  const [image, setImage] = useState<Blob[]>();
  const formData: FormData = new FormData();
  const navigate = useNavigate();
  const { questionId } = useParams();
  const imagelist = useRecoilValue<string[]>(imageListAtom);

  useEffect(() => {
    titleRef.current?.focus();
    if (questionId) {
      const getSpecificQuestion = async () => {
        setGetApi(true);
        const questionInfo = await GetSpecificQuestion(questionId);
        if (typeof questionInfo !== 'boolean') {
          if (titleRef.current) titleRef.current.value = questionInfo.title;
          if (contentRef.current) contentRef.current.value = questionInfo.content;
          languageRef.current = questionInfo.language;
          if (questionInfo.content_image) setEnrolledImageList(questionInfo.content_image);
        }
        setGetApi(false);
      };
      getSpecificQuestion();
    }
  }, []);

  useEffect(() => {
    console.log(languageRef.current);
  }, [languageRef.current]);

  const onSubmit = async (): Promise<JSX.Element | void> => {
    if (titleRef.current?.value === '') {
      alert('제목을 입력해주세요.');
      titleRef.current.focus();
      return;
    } else if (contentRef.current?.value === '') {
      alert('내용을 입력해주세요.');
      contentRef.current.focus();
      return;
    } else if (languageRef.current === Languages[0]) {
      alert('질문 언어를 선택해주세요.');
      return;
    }

    if (questionId) {
      const deleteImageList: { [key: number]: string } = {};
      enrolledImageList.forEach((image, index) => {
        if (!imagelist.includes(image)) {
          deleteImageList[index] = image.slice(process.env.REACT_APP_BASE_URL?.length, image.length);
        }
      });
      const dataSet = {
        language: Languages.indexOf(languageRef.current),
        title: titleRef.current?.value,
        content: contentRef.current?.value,
        deleteList: deleteImageList,
      };
      formData.append('data', JSON.stringify(dataSet));
      image?.forEach((image) => formData.append('images', image));
      if (await editQuestion(formData, questionId)) {
        alert('수정이 완료되었습니다.');
      }
    } else {
      const dataSet = {
        language: Languages.indexOf(languageRef.current),
        title: titleRef.current?.value,
        content: contentRef.current?.value,
      };
      formData.append('data', JSON.stringify(dataSet));
      image?.forEach((image) => formData.append('images', image));
      // formData.append('images', image ? image : '');
      if (await askQuestion(formData)) {
        setModal(true);
      }
    }
    formData.delete('data');
    formData.delete('images');
  };

  const completeQuestion = (): void => {
    setModal(false);
    navigate('/');
  };

  return (
    <QuestionBox>
      {modal && <SubmitCompleteModal completeQuestion={completeQuestion} />}
      <FormHead />
      <Top>
        <QuestionTitle titleRef={titleRef} />
        <DropDown languageRef={languageRef} border='1 3' width={300} />
        <Submit src={SubmitIcon} onClick={onSubmit} />
      </Top>
      <Middle>
        <QuestionContent contentRef={contentRef} />
      </Middle>
      <Bottom>
        <QuestionFile setImage={setImage} enrolledImageList={questionId ? enrolledImageList : undefined} />
      </Bottom>
    </QuestionBox>
  );
};

export default QuestionForm;
