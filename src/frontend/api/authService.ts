/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mentee, SignApi } from './api';
import jwt_decode from 'jwt-decode';
import { SetterOrUpdater } from 'recoil';
import { UserInfoType } from '../recoil/atom';
import defaultProfile from '../assets/images/defaultProfile.svg';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export interface SignInProps {
  email: string;
  password_signin: string;
}

export interface SignInService extends SignInProps {
  isKeep: boolean;
  setUserInfo: SetterOrUpdater<UserInfoType>;
}

export interface FormValue extends SignInProps {
  password: string;
  password_confirm: string;
  nickname: string;
  phone: number;
}

export const SignUp = async (userData: FormData) => {
  try {
    const res = await SignApi.signUp(userData);
    if (res.status === 200) return true;
  } catch (error) {
    console.log(error);
  }
};

export const SignIn = async (userData: SignInService): Promise<void | boolean> => {
  try {
    const res = await SignApi.signIn(userData);
    if (res.status === 200) {
      console.log(res);
      const token = res.data.result.accessToken;
      axios.defaults.headers.common['x-access-token'] = token;
      const decodedUser: any = jwt_decode(token);
      const userInfo = {
        name: decodedUser.nickname,
        profileImage: decodedUser.profileImage ? decodedUser.profileImage : defaultProfile,
        mentos: decodedUser.mentos,
        role: decodedUser.type,
      };
      if (res.data.result.refreshToken) {
        const [, setCookie] = useCookies(['refresh-token']);
        setCookie('refresh-token', res.data.result.refreshToken, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
      }

      userData.setUserInfo(userInfo);
      return true;
    }
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const Question = async (questionContents: FormData): Promise<void | boolean> => {
  try {
    const res = await Mentee.question(questionContents);
    if (res.status === 200) {
      console.log(res);
      return true;
    }
  } catch (error: any) {
    if (error.response.status === 400) {
      alert(error.response.data.message);
    }
    console.log(error);
  }
};
