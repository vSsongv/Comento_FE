import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { headerVisibilityAtom } from '../../recoil/atom/headerVisibilityAtom';
import SignInTemplate from '../templates/SignIn';

const SignIn = () => {
  //   const [headerVisibility, setHeaderVisibility] = useRecoilState(headerVisibilityAtom);
  //   useEffect(() => {
  //     setHeaderVisibility(1);
  //     console.log(headerVisibility);
  //     return () => {
  //       setHeaderVisibility(0);
  //       console.log(headerVisibility);
  //     };
  //   }, []);

  return (
    <>
      <SignInTemplate />
    </>
  );
};

export default SignIn;
