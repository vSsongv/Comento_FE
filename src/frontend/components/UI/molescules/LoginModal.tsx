import React from "react";
import styled from "styled-components";
import logo from "../../../assets/images/comentoLoginLogo.png"
import ShadowBox from "../atoms/ShadowBox";

const Box = styled(ShadowBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Logo = styled.img`
  width:226px;
  height: 57px;
  margin-top: 51px;
`

type LoginModalProps = {
  children: React.ReactNode;
  width: string;
  height: string;
}

function LoginModal(props: LoginModalProps) {
  return <Box style={{width: props.width, height: props.height}}>
    <Logo src={logo}/>
      { props.children }
  </Box>;
}

export default LoginModal;
