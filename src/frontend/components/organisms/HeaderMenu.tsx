import React, { useEffect } from 'react';
import styled from 'styled-components';
import { shadow } from '../../styles/styleUtil';
import HeaderProfile from '../molescules/HeaderProfile';
import HeaderMenuList from '../molescules/HeaderMenuList';
import useClickState from '../../hooks/useClickState';
import { useRecoilState } from 'recoil';
import { headerMenu } from '../../recoil/atom/headerVisibilityAtom';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  const [, setHeaderState] = useRecoilState<boolean>(headerMenu);
  const [searchInputRef, handleClickOutside] = useClickState(setHeaderState);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchInputRef]);

  return (
    <MenuContainer ref={searchInputRef}>
      <HeaderProfile />
      <HeaderMenuList />
    </MenuContainer>
  );
};

export default HeaderMenu;
