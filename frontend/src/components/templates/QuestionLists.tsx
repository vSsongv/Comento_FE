import React from 'react';
import styled from 'styled-components';
import QuestionTypeNum from '../organisms/QuestionTypeNum';
import QuestionList from '../organisms/QuestionList';
import QuestionDetail from '../organisms/QuestionDetail';
import { useRecoilValue } from 'recoil';
import { crtQuestion, questionType, userInfo, UserInfoType } from '../../recoil/atom';
import RoleToggle from '../molescules/List/RoleToggle';
import Button from '../atoms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmMentoring } from '../../api/mentoringService';

const Container = styled.div`
  background-color: white;
  width: 90%;
  padding: 50px;
  margin: 60px auto 100px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 550px;
  margin-top: 40px;
  justify-content: space-between;
`;

const BtnWrrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const ListTemplate = () => {
  const user = useRecoilValue<UserInfoType>(userInfo);
  const type = useRecoilValue<number>(questionType);
  const mentoringId = useRecoilValue<string>(crtQuestion);
  const { role } = useParams();
  const navigate = useNavigate();

  const handler = async () => {
    if (type === 0) {
      if (role === 'mentor') {
        if (await confirmMentoring(mentoringId)) navigate(`/chatting/${mentoringId}`);
      } else {
        navigate(`/question/edit/${mentoringId}`);
      }
    } else navigate(`/chatting/${mentoringId}`);
  };

  return (
    <Container>
      {user.role === 'A' ? <RoleToggle /> : null}
      <QuestionTypeNum></QuestionTypeNum>
      <Wrapper>
        <QuestionList></QuestionList>
        {mentoringId !== '' ? (
          <div style={{ position: 'relative' }}>
            <QuestionDetail width={48} />
            <BtnWrrapper>
              <Button onClick={handler} width={95} height={40} fontSize={14}>
                {type !== 0 ? '채팅방 이동' : role === 'mentee' ? '수정하기' : '답변하기'}
              </Button>
            </BtnWrrapper>
          </div>
        ) : null}
      </Wrapper>
    </Container>
  );
};

export default ListTemplate;
