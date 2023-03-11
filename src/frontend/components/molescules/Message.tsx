import React from 'react';
import styled from 'styled-components';
import DefaultProfile from '../../assets/images/defaultProfile.svg';

const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Profile = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 100%;
`;

const NameAndContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px;
`;

const UserName = styled.p`
  font-size: 11px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Contents = styled.div`
  margin: 5px 0;
  padding: 10px 15px;
  background-color: #ececec;
  border-radius: 10px;
  line-height: 25px;
`;

const Time = styled.p`
  display: flex;
  font-size: 12px;
  color: #979797;
  align-items: flex-end;
  padding: 7px 10px;
  white-space: nowrap;
`;

const Message = () => {
  return (
    <MessageContainer>
      <Profile src={DefaultProfile} alt='profile image' />
      <NameAndContents>
        <UserName>코멘토 사용자</UserName>
        <ContentsBox>
          <Contents>
            여기서 이렇게 구현하고 싶은데 어떻게 해야 할까요 이 부분은 이렇게 해서 이런 식으로 했는데 여기서는 코드를
            어떻게 짜야 할지 모르겠어요 여기서 이렇게 구현하고 싶은데 어떻게 해야 할까요 이 부분은 이렇게 해서 이런
            식으로 했는데 여기서는 코드를 어떻게 짜야 할지 모르겠어요 여기서 이렇게 구현하고 싶은데 어떻게 해야 할까요
            이 부분은 이렇게 해서 이런 식으로 했는데 여기서는 코드를 어떻게 짜야 할지 모르겠어요
          </Contents>
          <Time>AM 01:32</Time>
        </ContentsBox>
      </NameAndContents>
    </MessageContainer>
  );
};

export default Message;
