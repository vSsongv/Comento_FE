import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { crtQuestion, questionType } from '../../../recoil/atom';
import { mainGradient } from '../../../styles/styleUtil';

interface Props {
  left: number;
}

const Toggle = styled.div`
  ${mainGradient};
  height: 4.5%;
  width: 6%;
  border-radius: 30px;
  text-align: center;
  position: absolute;
  top: 27%;
  left: 9%;
`;

const ToggleBtn = styled.button<Props>`
  ${(props) => {
    const LEFT = props.left;
    return css`
      cursor: pointer;
      border: none;
      position: absolute;
      top: 27.4%;
      left: ${LEFT}%;
      border-radius: 100px;
      background-color: white;
      height: 3.5%;
      width: 1.7%;
    `;
  }};
`;

const Desc = styled.span`
  font-size: 16px;
  position: absolute;
  font-weight: 800;
  font-family: 'NanumGothic';
  top: 32%;
  left: 9.5%;
  color: #236ad6;
`;

const RoleToggle = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const setMentoringId = useSetRecoilState<string>(crtQuestion);
  const setType = useSetRecoilState<number>(questionType);

  return (
    <div>
      {' '}
      <Toggle />
      {role === 'mentor' ? (
        <>
          <ToggleBtn
            left={9.3}
            onClick={() => {
              setMentoringId('');
              setType(0);
              navigate('/questionList/mentee');
            }}
          />
          <Desc>질문자 전환</Desc>
        </>
      ) : (
        <>
          <ToggleBtn
            left={13}
            onClick={() => {
              setMentoringId('');
              setType(0);
              navigate('/questionList/mentor');
            }}
          />
          <Desc>답변자 전환</Desc>
        </>
      )}
    </div>
  );
};

export default RoleToggle;
