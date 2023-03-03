import axios from 'axios';

export const api = axios.create({
  baseURL: '//3.37.84.147:8080', //TODO: process.env.REACT_APP_API_URL,
});

export const SignApi = {
  signIn: () => api.post('user/signin'),
  signUp: (userData: FormData) => api.post('user/signup', userData),
  checkDupleEmail: (email: string) => api.get(`user/check/email?email=${email}`),
  checkDupleNick: (nickname: string) => api.get(`user/check/nickname?nickname=${nickname}`),
  checkDuplePhone: (phone: string) => api.get(`user/check/phone?phone=${phone}`),
};
