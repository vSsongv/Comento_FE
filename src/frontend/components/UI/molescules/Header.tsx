import { theme } from "./../../../styles/theme";
import React from "react";
import styled from "styled-components";
import { shadow } from "../../../styles/styleUtil";

type HeaderProps = {
  children?: React.ReactNode;
};

const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
  ${shadow(1)}
`;

const WhiteBackground = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  height: auto;
`;

const HeaderContents = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 4rem;
  padding-left: 4rem;
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${theme.color.primaryColor};
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

function Header({ children }: HeaderProps) {
  return (
    <Positioner>
      <WhiteBackground>
        <HeaderContents>
          <Logo>Commento</Logo>
          <Spacer />
          {children}
        </HeaderContents>
      </WhiteBackground>
    </Positioner>
  );
}

export default Header;
