import axios from 'axios';
import { User } from './api';

export const changePwd = async (prevPassword: string, password: string) => {
  try {
    const res = await User.changePwd(prevPassword, password);
    if (res.status === 200) {
      alert(res.data.message);
    }
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const changeNick = async (nickname: string) => {
  try {
    const res = await User.changeNick(nickname);
    if (res.status === 200) {
      alert(res.data.message);
      return res.data.result;
    }
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const changeProfile = async (profile: FormData) => {
  try {
    const res = await User.changeProfile(profile);
    if (res.status === 200) {
      alert(res.data.message);
      return res.data.result;
    }
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
