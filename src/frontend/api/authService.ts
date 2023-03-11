/* eslint-disable @typescript-eslint/no-explicit-any */
import { api, Auth, Mentee, SignApi } from './api';
import jwt_decode from 'jwt-decode';
import { SetterOrUpdater } from 'recoil';
import { UserInfoType } from '../recoil/atom';
import defaultProfile from '../assets/images/defaultProfile.svg';

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

export const getUserInfo = async (role: string): Promise<UserInfoType | boolean> => {
  try {
    const res = await SignApi.userInfo();
    const userInfo = {
      name: res.data.result.nickname,
      profileImage: res.data.result.image ? process.env.REACT_APP_BASE_URL + res.data.result.image : defaultProfile,
      mentos: res.data.result.mentos,
      email: res.data.result.email,
      role: role,
    };
    return userInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const TokenConfig = async (token: any): Promise<UserInfoType | boolean> => {
  api.defaults.headers.common['x-access-token'] = token;
  const decodedUser: any = jwt_decode(token);
  sessionStorage.setItem('token_exp', decodedUser.exp);
  const userInfo = await getUserInfo(decodedUser.role);
  return userInfo;
};

export const refresh = async (
  refreshToken: any,
  cookies: { 'refresh-token'?: any },
  setUserInfo: SetterOrUpdater<UserInfoType>,
  setSignInState: SetterOrUpdater<boolean>
): Promise<void | boolean> => {
  try {
    const res = await Auth.refresh(refreshToken);
    console.log(res);
    const token = res.data.result;
    const userInfo = await TokenConfig(token);
    if (userInfo === false || userInfo === true) {
      alert('다시 로그인해주세요.');
      return false;
    }
    setUserInfo(userInfo);
    authInterceptor(cookies, setUserInfo, setSignInState);
    return token;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

export const authInterceptor = (
  cookies: { 'refresh-token'?: any },
  setUserInfo: SetterOrUpdater<UserInfoType>,
  setSignInState: SetterOrUpdater<boolean>
) => {
  api.interceptors.request.use(
    async (config) => {
      const timestamp = new Date().getTime() / 1000;
      const refreshToken = cookies['refresh-token'];
      const exp = sessionStorage.getItem('token_exp');
      if (exp) {
        if (parseInt(exp) - timestamp < 10) {
          const token = await refresh(refreshToken, cookies, setUserInfo, setSignInState);
          if (token) {
            setSignInState(true);
            config.headers = {
              'x-access-token': token,
            };
          } else {
            throw new Error('No Token');
          }
        }
        return config;
      }
    },
    async (error: any) => {
      console.log(error);
      if (error.response.data.code === 2043) {
        if (await refresh(cookies['refresh-token'], cookies, setUserInfo, setSignInState)) {
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
  return true;
};

export const SignIn = async (
  userData: SignInService,
  cookies: { 'refresh-token'?: any },
  setCookie: (name: 'refresh-token', value: string | object, options?: object) => void,
  setSignInState: SetterOrUpdater<boolean>
): Promise<void | boolean> => {
  try {
    const res = await Auth.signIn(userData);
    const token = res.data.result.accessToken;
    const userInfo = await TokenConfig(token);
    if (userInfo === false || userInfo === true) {
      alert('다시 로그인해주세요.');
      return false;
    }
    userData.setUserInfo(userInfo);
    const decoded_refresh: any = jwt_decode(res.data.result.refreshToken);
    const exp = new Date(decoded_refresh.exp * 1000);
    setCookie('refresh-token', res.data.result.refreshToken, {
      path: '/',
      secure: true,
      sameSite: 'none',
      expires: exp,
    });
    authInterceptor(cookies, userData.setUserInfo, setSignInState);
    return true;
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const askQuestion = async (questionContents: FormData): Promise<void | boolean> => {
  try {
    const res = await Mentee.question(questionContents);
    console.log(res);
    return true;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 400) {
      alert(error.response.data.message);
    }
  }
};
