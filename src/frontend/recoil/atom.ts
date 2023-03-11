import { atom } from 'recoil';
import defaultProfile from '../assets/images/defaultProfile.svg';

export const signInState = atom<boolean>({
  key: 'signInState',
  default: true,
});

export interface UserInfoType {
  name: string;
  email: string;
  profileImage: string;
  mentos: number;
  role: string;
}

export const userInfo = atom<UserInfoType>({
  key: 'UserInfo',
  default: {
    name: 'Comento',
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
