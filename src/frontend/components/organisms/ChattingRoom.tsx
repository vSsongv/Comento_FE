import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { userInfo, UserInfoType } from '../../recoil/atom';
import { border, boxShadow } from '../../styles/styleUtil';
import ChattingInput from '../molescules/ChattingInput';
import Message from '../molescules/Message';
import { EnterChattingRoom, SendImage, SendMessage } from '../../api/chattingService';
import { useParams } from 'react-router-dom';

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
  interface messageProp {
    chatid: string;
    isMe: boolean;
    nickname: string;
    message?: string;
    image?: string;
    createdAt: string;
  }

  const messageRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const myInfo = useRecoilValue<UserInfoType>(userInfo);
  const [messages, setMessages] = useState<messageProp[]>([]);
  const [newMessage, setNewMessage] = useState<messageProp>();
  const [image, setImage] = useState<Blob>();
  const [counterPartProfile, setCounterPartProfile] = useState<string>('');
  const topRef = useRef<HTMLDivElement>(null);
  const { roomid } = useParams();
  const formData: FormData = new FormData();

  const options = {
    threshold: 1.0,
  };
  const moreMessage = () => {
    console.log('ㅋㅋㅎㅇ');
  };
  const scrollObserver = new IntersectionObserver(moreMessage, options);

  useEffect(() => {
    const enterChattingRoom = async (): Promise<void> => {
      if (roomid) {
        const counterPartInfo = await EnterChattingRoom(roomid);
        if (typeof counterPartInfo !== 'boolean') {
          setCounterPartProfile(counterPartInfo.profile);
          const newMessages: messageProp[] = counterPartInfo.chat.map((chat: messageProp) => {
            const message: messageProp = {
              chatid: chat.chatid,
              isMe: chat.nickname === myInfo.name ? true : false,
              nickname: chat.nickname,
              message: chat.message ? chat.message : undefined,
              image: chat.image ? process.env.REACT_APP_BASE_URL + chat.image : undefined,
              createdAt: chat.createdAt,
            };
            return message;
          });
          setMessages(newMessages);
        }
      }
    };
    enterChattingRoom();
    const socket = io('http://192.168.43.228:8080');
    socket.on('connect', () => {
      socket.emit('join', roomid);
    });
    socket.on('message', (message) => {
      const newMessage = {
        chatid: message.chatid,
        isMe: message.nickname === myInfo.name ? true : false,
        nickname: message.nickname,
        message: message.message,
        createdAt: message.createdAt,
      };
      setNewMessage(newMessage);
    });
    socket.on('image', (message) => {
      const newMessage = {
        chatid: message.chatid,
        isMe: message.nickname === myInfo.name ? true : false,
        nickname: message.nickname,
        image: process.env.REACT_APP_BASE_URL + message.image,
        createdAt: message.createdAt,
      };
      setNewMessage(newMessage);
    });
    if (topRef.current) {
      console.log('hi');
      scrollObserver.observe(topRef.current);
      // return () => {
      //   scrollObserver.unobserve(topRef.current!);
      // };
    }
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect((): void => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
    }
  }, [newMessage]);

  useEffect((): void => {
    messageRef.current?.focus();
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (): Promise<void> => {
    if (roomid) {
      if (messageRef.current && messageRef.current.value !== '') {
        const message = messageRef.current.value;
        messageRef.current.value = '';
        await SendMessage(roomid, myInfo.name, message);
        // setMessages([...messages, newMessage]);
      } else if (image) {
        formData.append('images', image);
        formData.append('data', myInfo.name);
        if (!(await SendImage(roomid, formData))) {
          alert('메세지 전송에 실패했습니다.');
        }
        formData.delete('images');
        formData.delete('data');
      }
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      setImage(fileList[0]);
      // formData.append('images', fileList[0]);
    }
  };

  const Messages = () => {
    return messages.map((message, index) => {
      return (
        <Message
          key={message.chatid}
          topRef={index === 0 ? topRef : undefined}
          isMe={message.isMe}
          nickname={message.nickname}
          message={message.message ? message.message : undefined}
          image={message.image ? message.image : undefined}
          createdAt={message.createdAt}
          profile={message.isMe ? myInfo.profileImage : counterPartProfile}
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
