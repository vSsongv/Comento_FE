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

export const TokenConfig = (token: any): UserInfoType => {
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

export const authInterceptor = (
  refreshToken: any,
  setUserInfo: SetterOrUpdater<UserInfoType>,
  setSignInState: SetterOrUpdater<boolean>,
  navigate?: NavigateFunction
) => {
  api.interceptors.response.use(
    (res) => {
      console.log(res);
    },
    async (error: any) => {
      console.log(error);
      if (error.response.data.code === 2043) {
        if (await refresh(refreshToken, setUserInfo, navigate)) {
          setSignInState(true);
          return true;
        } else {
          return false;
        }
      } else {
        alert(error.response.data.message);
      }
    }
  );
};

export const SignIn = async (
  userData: SignInService,
  setCookie: (name: 'refresh-token', value: string | object, options?: object) => void,
  navigate: NavigateFunction,
  setSignInState: SetterOrUpdater<boolean>
): Promise<void | boolean> => {
  try {
    const res = await SignApi.signIn(userData);
    // if (res.status && res.status === 200) {
    const token = res.data.result.accessToken;
    const userInfo = TokenConfig(token);
    userData.setUserInfo(userInfo);

    // const now = new Date();
    // const exp = new Date();
    // const decoded_refresh: any = jwt_decode(res.data.result.refreshToken);
    // const INTERVAL = decoded_refresh.exp - decoded_refresh.iat;
    // exp.setMilliseconds(now.getMilliseconds() + INTERVAL);
    // console.log(exp);
    setCookie('refresh-token', res.data.result.refreshToken, {
      path: '/',
      secure: true,
      sameSite: 'none',
      // expires: decoded_refresh.exp,
    });
    authInterceptor(res.data.result.refreshToken, userData.setUserInfo, setSignInState, navigate);
    // api.interceptors.response.use(
    //   (res) => {
    //     console.log(res);
    //   },
    //   async (error: any) => {
    //     console.log(error);
    //     if (error.response.data.code === 2043 && userData.refreshToken) {
    //       if (await refresh(userData.refreshToken, userData.setUserInfo, navigate)) {
    //         setSignInState(true);
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     } else {
    //       alert(error.response.data.message);
    //     }
    //   }
    // );
    return true;
    // }
  } catch (error: any) {
    console.log(error);
  }
};

export const refresh = async (
  refreshToken: any,
  setUserInfo: SetterOrUpdater<UserInfoType>,
  navigate?: NavigateFunction
): Promise<void | boolean> => {
  try {
    console.log('재발급 요청');
    const res = await Token.refresh(refreshToken);
    console.log(res);

    const token = res.data.result.accessToken;
    const userInfo = TokenConfig(token);
    setUserInfo(userInfo);
    return true;
  } catch (error: any) {
    console.log(error);
    if (error.response.data.code && error.response.data.code === 2043) {
      alert('로그인이 필요합니다.');
      if (navigate) {
        navigate('/signIn');
      }
      return false;
    }
  }
};

export const Question = async (questionContents: FormData): Promise<void | boolean> => {
  try {
    const res = await Mentee.question(questionContents);
    console.log(res);
    // if (res.status && res.status === 200) {
    return true;
    // }
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 400) {
      alert(error.response.data.message);
    }
  }
};
