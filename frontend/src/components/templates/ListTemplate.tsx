import React from 'react';
import styled from 'styled-components';
import QuestionTypeNum from '../organisms/QuestionTypeNum';
import QuestionList from '../organisms/QuestionList';
import QuestionDetail from '../organisms/QuestionDetail';
import { useRecoilValue } from 'recoil';
import { crtQuestion, questionType, userInfo, UserInfoType } from '../../recoil/atom';
import RoleToggle from '../molescules/List/RoleToggle';
import Button from '../atoms/Button';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  background-color: white;
  width: 90%;
  padding: 50px;
  margin: auto;
  margin-top: 60px;
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
              <Button width={95} height={40} fontSize={14}>
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
