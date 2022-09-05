import React from "react";
import { theme } from "./../../../styles/theme";
import styled from "styled-components";

type FooterProps = {
    children?: React.ReactNode;
};

const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0px;
    width: 100%;
`;

const BlackBackground = styled.div`
    background-color: black;
    display: flex;
    justify-content: center;
    height: auto;
`;

const FooterContents = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    padding-top: 2rem;
    padding-left: 4rem;
    padding-right: 4rem;
`;

const Logo = styled.div`
    font-size: 1.4rem;
    font-weight: blod;
    color: ${theme.color.primaryColor};
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

function Footer({children}: FooterProps) {
    return(
        <Positioner>
        <BlackBackground>
            <FooterContents>
                <Logo>Commento</Logo>
                <Spacer/>
                {children}
            </FooterContents>
        </BlackBackground>
        </Positioner>
    );
}

export default Footer;