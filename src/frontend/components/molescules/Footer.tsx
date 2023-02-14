import React from 'react';
import colors from '../../styles/colors';
import styled from 'styled-components';

const FooterContents = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
  padding-bottom: 80px;
  display: flex;
  background-color: black;
  flex-direction: row;
`;

const Logo = styled.div`
  padding-top: 2rem;
  padding-left: 4rem;
  padding-right: 4rem;
  font-size: 1.4rem;
  font-weight: blod;
  color: ${colors.primaryColor};
`;

export default function Footer() {
  return (
    <FooterContents>
      <Logo>Commento</Logo>
    </FooterContents>
  );
}
