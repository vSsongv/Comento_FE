/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './api';

export const changePwd = async (prevPassword: string, password: string): Promise<boolean | undefined> => {
  try {
    const res = await User.changePwd(prevPassword, password);
    if (res.status === 200) {
      alert(res.data.message);
      return true;
    }
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const changeNick = async (nickname: string): Promise<any> => {
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

export const changeProfile = async (profile: FormData): Promise<any> => {
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

export const askMentoRole = async (email: string, content: string): Promise<void> => {
  try {
    const res = await User.askMentoRole(email, content);
    if (res.status === 200) {
      alert(res.data.message);
    }
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
