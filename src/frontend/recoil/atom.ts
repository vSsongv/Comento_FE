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

export const userInfo = atom<UserInfoType>({
  key: 'UserInfo',
  default: {
    nickname: 'Comento',
    email: 'Comento@mentos.com',
    profileImage: defaultProfile,
    mentos: 0,
    role: '',
  },
});

export const headerMenu = atom<boolean>({
  key: 'headerMenuState',
  default: false,
});
