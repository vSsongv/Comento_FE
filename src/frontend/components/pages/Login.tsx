import { headerVisibilityAtom } from "./../../../recoil/atom/headerVisibilityAtom";
import React from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";

function Login() {
  const setHeaderVisibility = useSetRecoilState(headerVisibilityAtom);
  return <>홈페이지 입니다 {setHeaderVisibility(0)}</>;
}

export default Login;
