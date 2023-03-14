import React, { RefObject } from 'react';
import styled from 'styled-components';

interface IsMeProp {
  isMe: boolean;
}

const MessageContainer = styled.div<IsMeProp>`
  display: flex;
  flex-direction: ${(props) => (props.isMe ? 'row-reverse' : 'row')};
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

const UserName = styled.p<IsMeProp>`
  font-size: 11px;
  text-align: ${(props) => (props.isMe ? 'right' : 'left')};
`;

const ContentsBox = styled.div<IsMeProp>`
  display: flex;
  flex-direction: ${(props) => (props.isMe ? 'row-reverse' : 'row')};
`;

const Contents = styled.div`
  margin: 5px 0;
  padding: 10px 15px;
  background-color: #ececec;
  border-radius: 10px;
  line-height: 25px;
`;

const Image = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 10px;
`;

const Time = styled.p`
  display: flex;
  font-size: 12px;
  color: #979797;
  align-items: flex-end;
  padding: 7px 10px;
  white-space: nowrap;
`;

interface Props extends IsMeProp {
  topRef?: RefObject<HTMLDivElement>;
  nickname: string;
  message?: string;
  image?: string;
  createdAt: string;
  profile: string;
}

const Message = ({ isMe, topRef, nickname, message, image, createdAt, profile }: Props) => {
  return (
    <MessageContainer isMe={isMe} ref={topRef}>
      <Profile src={profile} alt='profile image' />
      <NameAndContents>
        <UserName isMe={isMe}>{nickname}</UserName>
        <ContentsBox isMe={isMe}>
          {message && <Contents>{message}</Contents>}
          {image && <Image src={image} alt='사진' />}
          <Time>{createdAt}</Time>
        </ContentsBox>
      </NameAndContents>
    </MessageContainer>
  );
};

export default Message;
