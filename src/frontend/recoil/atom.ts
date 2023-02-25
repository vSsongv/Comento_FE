import { atom } from 'recoil';
import defaultProfile from '../assets/images/defaultProfile.svg';

export const signInState = atom<boolean>({
  key: 'signInState',
  default: false,
});

export interface UserInfoType {
  name: string;
  profileImage: string;
  mentos: number;
}

export const userInfo = atom<UserInfoType>({
  key: 'UserInfo',
  default: {
    name: 'Comento',
    profileImage: defaultProfile,
    mentos: 0,
  },
});

export const headerMenu = atom<boolean>({
  key: 'headerMenuState',
  default: false,
});
