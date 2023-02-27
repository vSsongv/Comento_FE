import { SignApi } from './api';

export interface SignInProps {
  email: string;
  password_signin: string;
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
