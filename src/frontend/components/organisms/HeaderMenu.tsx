import React from 'react';
import styled from 'styled-components';
import { shadow } from '../../styles/styleUtil';
import HeaderProfile from '../molescules/HeaderProfile';
import HeaderMenuList from '../molescules/HeaderMenuList';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 4rem;
  width: 20vw;
  height: 50vh;
  margin-top: 0.5rem;
  padding: 1% 2%;
  background-color: white;
  border-radius: 20px;
  ${shadow(1)}
  z-index: 9999;
`;

const HeaderMenu = () => {
  return (
    <MenuContainer>
      <HeaderProfile />
      <HeaderMenuList />
    </MenuContainer>
  );
};

export default HeaderMenu;
