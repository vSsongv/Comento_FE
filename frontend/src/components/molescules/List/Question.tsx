import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { crtQuestion, QuestionContent, questionType, userInfo, UserInfoType } from '../../../recoil/atom';
import { border } from '../../../styles/styleUtil';
import { Languages } from '../../../utils/Languages';
import Trashcan from '../../../assets/images/delete.png';
import { deleteAnswer, deleteQuestion } from '../../../api/mentoringService';

type questionProps = {
  data: QuestionContent;
};

interface Props {
  backColor: string;
}

const Li = styled.li<Props>`
  position: relative;
  cursor: pointer;
  background-color: ${(props) => props.backColor};
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

const DeleteBtn = styled.button`
  cursor: pointer;
  position: absolute;
  width: 25px;
  height: 27px;
  right: 0;
  top: 35%;
  margin-right: 30px;
  border: none;
  z-index: 100;
  background-color: transparent;
  background-size: cover;
  background-image: url(${Trashcan});
`;

const Question = (data: questionProps) => {
  const { role } = useParams();
  const [mentoringId, setMentoringId] = useRecoilState<string>(crtQuestion);
  const typeNum = useRecoilValue<number>(questionType);
  const user = useRecoilValue<UserInfoType>(userInfo);

  const deleteQ = async (mentoringId: string): Promise<void> => {
    const confirmDel = confirm('정말 삭제하시겠습니까?');
    if (confirmDel && role) {
      if (role === 'mentee') {
        if (await deleteQuestion(mentoringId)) {
          setMentoringId('');
        }
      } else {
        if (await deleteAnswer(mentoringId)) {
          setMentoringId('');
        }
      }
    }
  };

  return (
    <Li id={data.data.mentoringid} backColor={data.data.mentoringid === mentoringId ? '#F5F5F5' : 'white'} onClick={() => setMentoringId(data.data.mentoringid)}>
      <Title>{data.data.title}</Title>
      <Nick>{role === 'mentee' ? user.nickname : data.data.nickname}</Nick>
      <Wrapper>
        <Date>{data.data.date.slice(0, 11)}</Date>
        <Lang>{Languages[data.data.language]}</Lang>
      </Wrapper>
      {data.data.mentoringid === mentoringId && ((role === 'mentee' && typeNum !== 1) || (role === 'mentor' && typeNum === 2)) ? <DeleteBtn onClick={() => deleteQ(data.data.mentoringid)} /> : null}
    </Li>
  );
};

export default Question;
