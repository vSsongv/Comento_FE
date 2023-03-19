import React from 'react';
import styled from 'styled-components';
import { boxShadow } from '../../styles/styleUtil';
import HeaderProfile from '../molescules/HeaderProfile';
import HeaderNavs from '../molescules/HeaderNavs';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 4rem;
  width: 20vw;
  height: 43vh;
  margin-top: 0.5rem;
  padding: 1% 2%;
  background-color: white;
  border-radius: 20px;
  box-shadow: ${boxShadow};
  z-index: 9999;
`;

const HeaderMenu = () => {
  return (
    <MenuContainer>
      <HeaderProfile />
      <HeaderNavs />
    </MenuContainer>
  );
};

export default HeaderMenu;
