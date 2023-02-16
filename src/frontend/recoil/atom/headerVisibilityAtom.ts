import { atom } from 'recoil';
import defaultProfile from '../../assets/images/defaultProfile.svg';

export const headerVisibilityAtom = atom({
  key: 'headerVisibilityState',
  default: 1,
});

interface UserInfo {
  name: string;
  profileImage: string;
  mentos: number;
}

export const userInfo = atom<UserInfo>({
  key: 'UserInfo',
  default: {
    name: 'Comento',
    profileImage: defaultProfile,
    mentos: 0,
  },
});
