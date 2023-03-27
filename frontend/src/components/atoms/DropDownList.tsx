import React, { MutableRefObject } from 'react';
import styled, { css } from 'styled-components';
import { Languages } from '../../utils/Languages';
import { boxShadow } from '../../styles/styleUtil';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { QuestionContent, questionList, questionType, selectedLang } from '../../recoil/atom';
import { getQuestionList } from '../../api/mentoringService';

interface DropDownProps {
  width: string;
  top: string;
}
const Ul = styled.ul<DropDownProps>`
  ${(props) => {
    const WIDTH = props.width;
    const TOP = props.top;
    return css`
      list-style: none;
      position: absolute;
      width: ${WIDTH};
      margin-top: ${TOP};
      text-align: center;
      z-index: 10;
    `;
  }}
`;
const Li = styled.li`
  position: relative;
  background-color: white;
  padding: 0.5rem 11%;
  text-align: left;
  &:hover {
    background-color: #e2e2e2;
  }
  box-shadow: ${boxShadow};
`;

interface Props {
  width: string;
  top: string;
  languageRef: MutableRefObject<string>;
}

const DropDownList = ({ languageRef, ...dropDownProps }: Props) => {
  const { role } = useParams();
  const type = useRecoilValue<number>(questionType);
  const setLang = useSetRecoilState<number>(selectedLang);
  const setQuestions = useSetRecoilState<QuestionContent[]>(questionList);

  const changeLanguage = async (language: string, index: number) => {
    languageRef.current = language;
    if (role) {
      setLang(index);
      const questions = await getQuestionList(type, index, role);
      if (typeof questions !== 'boolean') {
        setQuestions(questions);
      }
    }
  };

  const LanguageList: JSX.Element[] = Languages.map((language, index) => {
    return (
      <Li key={language} onClick={() => changeLanguage(language, index)}>
        {language}
      </Li>
    );
  });

  return <Ul {...dropDownProps}>{LanguageList}</Ul>;
};

export default DropDownList;
