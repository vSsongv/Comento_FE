import axios from 'axios';
import { SignInService } from './authService';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
export const auth = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const Auth = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refresh: (token: any) =>
    auth.get('user/refresh', {
      headers: {
        'x-access-token': token,
      },
    }),
  signIn: (userData: SignInService) =>
    auth.post('user/signin', {
      email: userData.email,
      password: userData.crt_password,
      isKeep: userData.isKeep,
    }),
};

export const SignApi = {
  getUserInfo: () => api.get('user/userInfo'),
  signUp: (userData: FormData) => api.post('user/signup', userData),
  checkDupleEmail: (email: string) => api.get(`user/check/email?email=${email}`),
  checkDupleNick: (nickname: string) => api.get(`user/check/nickname?nickname=${nickname}`),
  checkDuplePhone: (phone: string) => api.get(`user/check/phone?phone=${phone}`),
};

export const Mentee = {
  askQuestion: (questionContents: FormData) => api.post('mentee/question', questionContents),
  editQuestion: (questionContents: FormData, mentoringId: string) =>
    api.put(`mentee/question/${mentoringId}`, questionContents),
  getSpecificQuestion: (mentoringid: string) => api.get(`mentee/question/${mentoringid}`),
};

export const Chatting = {
  enterChattingRoom: (roomId: string) => api.get(`chat/${roomId}`),
  sendMessage: (roomId: string, nickname?: string, message?: string) =>
    api.post(`chat/${roomId}`, {
      nickname: nickname,
      message: message,
    }),
  sendImage: (roomId: string, chattingContents: FormData) => api.post(`chat/image/${roomId}`, chattingContents),
  askQuestion: (questionContents: FormData) => api.post('mentee/question', questionContents),
};

export const User = {
  changePwd: (prevPassword: string, password: string) =>
    api.patch('user/update/password', { prevPassword: prevPassword, password: password }),
  changeNick: (nickname: string) => api.patch('user/update/nickname', { nickname: nickname }),
  changeProfile: (profile: FormData) => api.patch('user/update/profile', profile),
  askMentoRole: (email: string, content: string) => api.post('user/email', { email: email, content: content }),
};

export const Mentoring = {
  // getQuestionList: (type: number, language: number, role: string) => api.get(`${role}/question?type=${type}&language=${language}`),
  getQuestionList: (type: number, language: number, role: string) =>
    api.get(`mento/question?type=${type}&language=${language}`),
  getQuestionTypeNum: () => api.get('mentor/count'),
  deleteQuestion: (mentoringId: string) => api.delete(`mentee/question/${mentoringId}`),
};
