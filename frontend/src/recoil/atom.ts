import { atom } from 'recoil';
import defaultProfile from '../assets/images/defaultProfile.svg';

export const signInState = atom<boolean>({
  key: 'signInState',
  default: false,
});

export interface UserInfoType {
  nickname: string;
  email: string;
  profileImage: string;
  mentos: number;
  role: string;
}

export interface QuestionContent {
  mentoringid: string;
  title: string;
  nickname: string;
  date: string;
  language: number;
}

export const userInfo = atom<UserInfoType>({
  key: 'UserInfo',
  default: {
    nickname: 'Comento',
    email: 'Comento@mentos.com',
    profileImage: defaultProfile,
    mentos: 0,
    role: 'Q',
  },
});

export const headerMenu = atom<boolean>({
  key: 'headerMenuState',
  default: false,
});

export const modalVisibleState = atom<boolean>({
  key: 'modalVisibleState',
  default: false,
});

export const questionList = atom<Array<QuestionContent>>({
  key: 'questionList',
  default: [],
});

export const questionType = atom<number>({
  key: 'questionType',
  default: 0,
});

export const crtQuestion = atom<number>({
  key: 'crtQuestion',
  default: 0,
});
