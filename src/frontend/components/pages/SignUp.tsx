import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { headerVisibilityAtom } from '../../recoil/atom/headerVisibilityAtom';
import SignUpModal from '../UI/organisms/SignUpModal';

function SingUp() {
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
      <SignUpModal
        onRegister={(email, pw) => {
          alert([email, pw]);
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
export default SingUp;
