import axios from 'axios';
import { User } from './api';

export const changePwd = async (prevPassword: string, password: string) => {
  try {
    const res = await User.changePwd(prevPassword, password);
    if (res.status === 200) {
      alert(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeNick = async (nickname: string) => {
  try {
    const res = await User.changeNick(nickname);
    if (res.status === 200) {
      alert(res.data.message);
      return res.data.result;
    }
  } catch (error) {
    console.log(error);
  }
};
