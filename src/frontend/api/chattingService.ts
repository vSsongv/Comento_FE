import { Chatting } from './api';
import defaultProfile from '../assets/images/defaultProfile.svg';

export interface CounterPartInfo {
  profile: string;
  chat: [];
}

export const EnterChattingRoom = async (roomId: string): Promise<CounterPartInfo | boolean> => {
  try {
    const res = await Chatting.enterChattingRoom(roomId);
    const userInfo = {
      profile: res.data.result.image ? process.env.REACT_APP_BASE_URL + res.data.result.image : defaultProfile,
      chat: res.data.result.chat,
    };
    console.log(res);
    return userInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const SendMessage = async (roomId: string, nickname: string, message: string): Promise<boolean> => {
  try {
    const res = await Chatting.sendMessage(roomId, nickname, message);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const SendImage = async (roomId: string, chattingContents: FormData): Promise<boolean> => {
  try {
    const res = await Chatting.sendImage(roomId, chattingContents);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
