import { headerVisibilityAtom } from "../../../recoil/atom/headerVisibilityAtom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SignupModal from "../UI/organisms/SignUpModal";

function Register() {
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
    <SignupModal onRegister={(email, pw) => {
      alert([email, pw]);
      return {
        success: false,
        pwError: 'pw error',
        etcError: 'etc error'
      };
    }}/>
  </>
}
export default Register;
