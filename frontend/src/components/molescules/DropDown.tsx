import React, { MutableRefObject, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import DropDownList from '../atoms/DropDownList';
import { border } from '../../styles/styleUtil';
import useClickState from '../../hooks/useClickState';

interface ChoiceBoxProps {
  width: number;
  borders: string[];
}

const ChoiceBox = styled.div<ChoiceBoxProps>`
  ${(props) => {
    const WIDTH = props.width;
    const BORDER = props.borders.map((item) => {
      return border(parseInt(item));
    });
    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: ${WIDTH}px;
      height: 100%;
      margin-left: 5%;
      margin-right: 0.5rem;
      cursor: pointer;
      ${BORDER}
    `;
  }}
`;

const ChoiceButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
`;

interface Props {
  languageRef: MutableRefObject<string>;
  border: string;
  width: number;
}

const DropDown = ({ languageRef, border, width }: Props) => {
  const [choosing, setChoosing] = useState<boolean>(false);
  const [searchInputRef, handleClickOutside] = useClickState(setChoosing);
  const borders = border.split(' ');

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchInputRef]);

  const choosingToggle = () => {
    setChoosing(!choosing);
  };

  return (
    <ChoiceBox onClick={choosingToggle} borders={borders} width={width} ref={searchInputRef}>
      <ChoiceButton>
        {languageRef.current}
        {choosing ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </ChoiceButton>
      {choosing ? <DropDownList width='100%' top='4rem' languageRef={languageRef} /> : null}
    </ChoiceBox>
  );
};

export default DropDown;
