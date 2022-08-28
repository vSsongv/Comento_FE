import { headerVisibilityAtom } from "./../../../recoil/atom/headerVisibilityAtom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SigninModal from "../UI/organisms/SigninModal";

function Login() {
  const [headerVisibility, setHeaderVisibility] = useRecoilState(headerVisibilityAtom);
  useEffect(() => {
    setHeaderVisibility(1);
    console.log(headerVisibility);
    return () => {
      setHeaderVisibility(0);
      console.log(headerVisibility);
    };
  }, []);

  return <>
    <SigninModal onLogin={(email, pw, rememberUser) => {
      alert([email, pw, rememberUser]);
      return {
        success: false,
        pwError: 'pw error',
        etcError: 'etc error'
      };
    }}/>
  </>
}

export default Login;
