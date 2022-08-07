import React from "react";
import Header from "../molescules/Header";
import HeaderLogin from "../molescules/HeaderLogin";
import { useRecoilValue } from "recoil";
import { headerVisibilityAtom } from "./../../../../recoil/atom/headerVisibilityAtom";

function HeaderContainer() {
  const headerVisibility = useRecoilValue(headerVisibilityAtom);
  return <Header>{headerVisibility == 1 && <HeaderLogin />}</Header>;
}

export default HeaderContainer;
