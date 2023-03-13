import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfo, UserInfoType } from '../../recoil/atom';
import { border, boxShadow } from '../../styles/styleUtil';
import ChattingInput from '../molescules/ChattingInput';
import Message from '../molescules/Message';
import TestImage from '../../assets/images/MainAdvantage_rocket.png';

const ChattingRoomContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  width: 43vw;
  height: 100%;
  background-color: white;
  box-shadow: ${boxShadow};
`;

const ChattingBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 595px;
  width: 97%;
  ${border(2)}
  overflow: scroll;
`;

const ChattingRoom = () => {
  const messageRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messages_test = [
    {
      id: 1,
      isMe: true,
      writer: '김준하',
      content:
        '여기서 이렇게 구현하고싶은데 어떻게 해야 할까요 이 부분은 이렇게 해서 이런 식으로 했는데 여기서는 코드를 어떻게 짜야 할지 모르겠어요 여기서 이렇게 구현하고 싶은데 어떻게 해야 할까요 이 부분은 이렇게 해서 이런 식으로 했는데 여기서는 코드를 어떻게 짜야 할지 모르겠어요 여기서 이렇게 구현하고 싶은데 어떻게 해야 할까요 이 부분은 이렇게 해서 이런 식으로 했는데 여기서는 코드를 어떻게 짜야 할지 모르겠어요',
      time: 'PM 01:32',
    },
    {
      id: 2,
      isMe: false,
      writer: '유정호',
      content: '이렇게 해보세용',
      time: 'PM 03:33',
    },
    {
      id: 3,
      isMe: true,
      writer: '김준하',
      content: '시러여',
      time: 'PM 03:35',
    },
    {
      id: 4,
      isMe: false,
      writer: '유정호',
      content: '그냥 파쿠르할게ㅇㅇ',
      // image: TestImage,
      time: 'PM 03:33',
    },
    {
      id: 4,
      isMe: false,
      writer: '유정호',
      // content: '그냥 파쿠르할게ㅇㅇ',
      image: TestImage,
      time: 'PM 03:33',
    },
  ];
  const myInfo = useRecoilValue<UserInfoType>(userInfo);

  const [messages, setMessages] = useState(messages_test);
  const [image, setImage] = useState<string>('');

  useEffect((): void => {
    messageRef.current?.focus();
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (): void => {
    const now = new Date();
    const hour = (now.getHours() % 12).toString();
    const minute = now.getMinutes().toString();
    const AMPM = now.getHours() / 12 < 1 ? 'AM' : 'PM';
    if (messageRef.current && messageRef.current.value !== '') {
      const newMessage = {
        id: 5,
        isMe: true,
        writer: myInfo.name,
        content: messageRef.current.value,
        time: AMPM + ' ' + hour.padStart(2, '0') + ':' + minute.padStart(2, '0'),
      };
      setMessages([...messages, newMessage]);
      messageRef.current.value = '';
    } else {
      const newMessage = {
        id: 5,
        isMe: true,
        writer: myInfo.name,
        image: image,
        time: AMPM + ' ' + hour.padStart(2, '0') + ':' + minute.padStart(2, '0'),
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      setImage(URL.createObjectURL(fileList[0]));
    }
  };

  const Messages = () => {
    return messages.map((message) => {
      return (
        <Message
          key={message.id}
          isMe={message.isMe}
          writer={message.writer}
          content={message.content ? message.content : undefined}
          image={message.image ? message.image : undefined}
          time={message.time}
        />
      );
    });
  };

  return (
    <ChattingRoomContainer>
      <ChattingBox ref={scrollRef}>{Messages()}</ChattingBox>
      <ChattingInput handleFile={handleFile} messageRef={messageRef} sendMessage={sendMessage} />
    </ChattingRoomContainer>
  );
};

export default ChattingRoom;
