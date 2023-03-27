import React from 'react';
import colors from '../../styles/colors';
import styled from 'styled-components';

const FooterContents = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-left: 35px;
  padding-bottom: 80px;
  display: flex;
  background-color: black;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${colors.primaryColor};
`;

const Email = styled.span`
  font-weight: bold;
  color: white;
  display: block;
  margin-left: 30px;
`;

export default function Footer() {
  return (
    <FooterContents>
      <Logo>Commento</Logo>
      <Email>fridayproj2.@gmail.com</Email>
    </FooterContents>
  );
}
