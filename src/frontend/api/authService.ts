/* eslint-disable @typescript-eslint/no-explicit-any */
import { api, Mentee, SignApi, Token } from './api';
import jwt_decode from 'jwt-decode';
import { SetterOrUpdater } from 'recoil';
import { UserInfoType } from '../recoil/atom';
import defaultProfile from '../assets/images/defaultProfile.svg';
import { NavigateFunction } from 'react-router-dom';

export interface SignInProps {
  email: string;
  password_signin: string;
}

export interface SignInService extends SignInProps {
  isKeep: boolean;
  setUserInfo: SetterOrUpdater<UserInfoType>;
  refreshToken?: any;
}

export interface FormValue extends SignInProps {
  password: string;
  password_confirm: string;
  nickname: string;
  phone: string;
}

export const isDuple = async (purpose: string, target: FormValue) => {
  try {
    switch (purpose) {
      case 'email': {
        const res = await SignApi.checkDupleEmail(target.email);
        alert(res.data.message);
        return true;
      }
      case 'nickname': {
        const res = await SignApi.checkDupleNick(target.nickname);
        alert(res.data.message);
        return true;
      }
      case 'phone': {
        const res = await SignApi.checkDuplePhone(target.phone);
        alert(res.data.message);
        return true;
      }
      default: {
        alert('잘못된 접근입니다.');
      }
    }
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const signUp = async (userData: FormData) => {
  try {
    const res = await SignApi.signUp(userData);
    if (res.status === 200) return true;
  } catch (error) {
    console.log(error);
  }
};

const TokenConfig = (token: any): UserInfoType => {
  api.defaults.headers.common['x-access-token'] = token;
  const decodedUser: any = jwt_decode(token);
  const userInfo = {
    name: decodedUser.nickname,
    profileImage: decodedUser.profileImage ? decodedUser.profileImage : defaultProfile,
    mentos: decodedUser.mentos,
    role: decodedUser.type,
  };
  return userInfo;
};

export const SignIn = async (
  userData: SignInService,
  setCookie: (name: 'refresh-token', value: string | object, options?: object) => void,
  navigate: NavigateFunction
): Promise<void | boolean> => {
  try {
    const res = await SignApi.signIn(userData);
    if (res.status === 200) {
      const token = res.data.result.accessToken;
      const userInfo = TokenConfig(token);
      userData.setUserInfo(userInfo);
      if (res.data.result.refreshToken) {
        setCookie('refresh-token', res.data.result.refreshToken, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
        api.interceptors.response.use(
          (res) => {
            console.log(res);
          },
          async (error: any) => {
            console.log(error);
            if (error.response.data.code === 2043 && userData.refreshToken) {
              refresh(userData.refreshToken, userData, navigate);
            } else {
              alert(error.response.data.message);
            }
          }
        );
      }
      return true;
    }
  } catch (error: any) {
    console.log(error);
  }
};

export const refresh = async (
  refreshToken: any,
  userData: SignInService,
  navigate: NavigateFunction
): Promise<void | boolean> => {
  try {
    const res = await Token.refresh(refreshToken);
    if (res.status === 200) {
      const token = res.data.result.accessToken;
      const userInfo = TokenConfig(token);
      userData.setUserInfo(userInfo);
      return true;
    }
  } catch (error: any) {
    console.log(error);
    if (error.response.data.code === 2043) {
      alert('로그인이 필요합니다.');
      navigate('/signIn');
      return false;
    }
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
