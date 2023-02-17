import React from 'react';
import styled from 'styled-components';
import Logout from '../../assets/images/Logout.png';
import MyPage from '../../assets/images/MyPage.png';
import Pay from '../../assets/images/Pay.png';
import Question from '../../assets/images/Question.png';
import MenuListAtom from '../atoms/MenuListAtom';

const MenuContainer = styled.ul`
  list-style: none;
  width: 100%;
`;

const HeaderMenuList = () => {
  return (
    <MenuContainer>
      <MenuListAtom imageSrc={Question} menu='질문하기' />
      <MenuListAtom imageSrc={Pay} menu='결제하기' />
      <MenuListAtom imageSrc={MyPage} menu='마이페이지' />
      <MenuListAtom imageSrc={Logout} menu='로그아웃' />
    </MenuContainer>
  );
};

export default HeaderMenuList;
