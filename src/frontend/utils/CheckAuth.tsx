import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { signInState } from '../recoil/atom';

const CheckAuth = () => {
  const isSignIn = useRecoilValue<boolean>(signInState);
  if (!isSignIn) {
    alert('로그인이 필요합니다.');
    window.location.href = '/signIn';
  }

  return <Outlet />;
};

export default CheckAuth;
