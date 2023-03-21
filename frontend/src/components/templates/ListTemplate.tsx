import React from 'react';
import styled, { css } from 'styled-components';
import QuestionTypeNum from '../organisms/QuestionTypeNum';
import QuestionList from '../organisms/QuestionList';
import { mainGradient } from '../../styles/styleUtil';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionDetail from '../organisms/QuestionDetail';

interface Props {
  left: number;
}

const Container = styled.div`
  background-color: white;
  width: 90%;
  padding: 50px;
  margin: auto;
  margin-top: 60px;
`;

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

const Wrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
`;

const ListTemplate = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  return (
    <Container>
      <Toggle />

      {role === 'mentor' ? (
        <>
          <ToggleBtn
            left={9.3}
            onClick={() => {
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
              navigate('/questionList/mentor');
            }}
          />
          <Desc>답변자 전환</Desc>
        </>
      )}

      <QuestionTypeNum></QuestionTypeNum>
      <Wrapper>
        <QuestionList></QuestionList>
        <div style={{ height: '550px' }}>
          <QuestionDetail width={48} />
        </div>
      </Wrapper>
    </Container>
  );
};

export default ListTemplate;
