import { headerVisibilityAtom } from "./../../../recoil/atom/headerVisibilityAtom";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

function Login() {
  const [headerVisibility, setHeaderVisibility] =
    useRecoilState(headerVisibilityAtom);
  useEffect(() => {
    setHeaderVisibility(0);
    console.log(headerVisibility);
    return () => {
      setHeaderVisibility(1);
      console.log(headerVisibility);
    };
  }, []);
  return <>로그인 페이지 입니다.</>;
}

export default Login;
