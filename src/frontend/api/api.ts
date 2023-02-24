import axios from 'axios';

export const api = axios.create({
  baseURL: '//3.37.84.147:8080', //TODO: process.env.REACT_APP_API_URL,
});

export const SignApi = {
  signIn: () => api.post('user/signin'),
  signUp: (userData: FormData) => api.post('user/signup', userData),
  checkDupleEmail: () => api.get('user/check/email'),
  checkDupleNick: () => api.get('user/check/nickname'),
  checkDuplePhone: () => api.get('user/check/phone'),
};
