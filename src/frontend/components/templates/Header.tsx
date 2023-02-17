import React from 'react';
import styled from 'styled-components';
import { shadow } from '../../styles/styleUtil';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import HeaderProfile from '../organisms/HeaderProfile';

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  width: 100%;
  padding: 0 4rem;
  background-color: white;
  ${shadow(1)}
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const Header = () => {
  return (
    <HeaderBox>
      <LogoLink to='/'>
        <img src={Logo} alt='Home Logo' />
      </LogoLink>
      <HeaderProfile />
    </HeaderBox>
  );
};

export default Header;
