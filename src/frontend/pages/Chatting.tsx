import React from 'react';
import { useParams } from 'react-router-dom';
import ChattingTemplate from '../components/templates/Chatting';

const Chatting = () => {
  const { roomid } = useParams();
  return <ChattingTemplate />;
};

export default Chatting;
