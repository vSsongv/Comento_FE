import { SignApi } from './api';

export type FormValue = {
  email: string;
  password: string;
  password_signin: string;
  password_confirm: string;
  nickname: string;
  phone: number;
};

export const SignUp = async (userData: FormData) => {
  try {
    const res = await SignApi.signUp(userData);
    if (res.status === 200) return true;
  } catch (error) {
    console.log(error);
  }
};
