import React from "react";
import { theme } from "./../../../styles/theme";
import styled from "styled-components";

const Positioner = styled.div`
    height: auto;
    min-height: 100%;
    position: relative;
`;

const BlackBackground = styled.div`
    background-color: black;
    display: flex;
    justify-content: center;
    height: auto;
`;

const FooterContents = styled.div`
    width: 100%;
    height: 164px;
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

export default function Footer() {
    return(
        <Positioner>
        <BlackBackground>
            <FooterContents>
                <Logo>Commento</Logo>
            </FooterContents>
        </BlackBackground>
        </Positioner>
    );
}