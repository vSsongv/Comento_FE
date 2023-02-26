import axios from 'axios';
import { SignInService } from './authService';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const SignApi = {
  signIn: (userData: SignInService) =>
    api.post('user/signin', {
      email: userData.email,
      password: userData.password_signin,
      isKeep: userData.isKeep,
    }),
  signUp: (userData: FormData) => api.post('user/signup', userData),
  checkDupleEmail: () => api.get('user/check/email'),
  checkDupleNick: () => api.get('user/check/nickname'),
  checkDuplePhone: () => api.get('user/check/phone'),
};

export const Mentee = {
  question: (questionContents: FormData) => api.post('mentee/question', questionContents),
};
