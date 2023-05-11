import React from 'react';
import { Outlet } from 'react-router-dom';

const CheckAuth = () => {
  const timestamp = new Date().getTime() / 1000;
  const exp = sessionStorage.getItem('token_exp');
  if (exp) {
    if (parseInt(exp) - timestamp < 10) {
      alert('로그인이 필요합니다.');
      window.location.href = '/signIn';
    }
  } else {
    alert('로그인이 필요합니다.');
    window.location.href = '/signIn';
  }

  return <Outlet />;
};

export default CheckAuth;
