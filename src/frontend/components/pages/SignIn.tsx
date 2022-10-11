import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { headerVisibilityAtom } from '../../recoil/atom/headerVisibilityAtom';
import SignInModal from '../UI/organisms/SignInModal';

function SignIn() {
  const [headerVisibility, setHeaderVisibility] = useRecoilState(headerVisibilityAtom);
  useEffect(() => {
    setHeaderVisibility(1);
    console.log(headerVisibility);
    return () => {
      setHeaderVisibility(0);
      console.log(headerVisibility);
    };
  }, []);

  return (
    <>
      <SignInModal
        onLogin={(email, pw, rememberUser) => {
          alert([email, pw, rememberUser]);
          return {
            success: false,
            pwError: 'pw error',
            etcError: 'etc error',
          };
        }}
      />
    </>
  );
}

export default SignIn;
