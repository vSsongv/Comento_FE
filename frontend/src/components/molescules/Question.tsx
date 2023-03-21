import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { crtQuestion, QuestionContent, userInfo, UserInfoType } from '../../recoil/atom';
import { border } from '../../styles/styleUtil';
import { Languages } from '../../utils/Languages';

type questionProps = {
  data: QuestionContent;
};

const Li = styled.li`
  cursor: pointer;
  background-color: white;
  padding: 15px 20px;
  ${border(2)};
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 17px;
  color: black;
  font-family: 'NanumGothic';
`;

const Nick = styled.span`
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumGothic';
  background: -webkit-linear-gradient(#0037ff, #00aeff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Wrapper = styled.div`
  width: 145px;
`;

const Date = styled.span`
  font-size: 14px;
  color: #909090;
  font-family: 'NanumGothic';
`;

const Lang = styled.span`
  font-size: 12px;
  color: black;
  font-family: 'NanumGothic';
  margin-left: 10px;
`;

const Question = (data: questionProps) => {
  const { role } = useParams();
  const setMentoringId = useSetRecoilState<string>(crtQuestion);
  const user = useRecoilValue<UserInfoType>(userInfo);

  return (
    <Li id={data.data.mentoringid} onClick={() => setMentoringId(data.data.mentoringid)}>
      <Title>{data.data.title}</Title>
      <Nick>{user.nickname}</Nick>
      {/* <Nick>{role === 'mentee' ? user.nickname : data.data.nickname}</Nick> */}
      <Wrapper>
        <Date>{data.data.date.slice(0, 11)}</Date>
        <Lang>{Languages[data.data.language]}</Lang>
      </Wrapper>
    </Li>
  );
};

export default Question;
