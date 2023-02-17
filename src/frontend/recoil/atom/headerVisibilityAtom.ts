import { atom } from 'recoil';
import defaultProfile from '../../assets/images/defaultProfile.svg';

export const headerVisibilityAtom = atom({
  key: 'headerVisibilityState',
  default: 2,
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
