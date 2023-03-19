import React from 'react';
import styled from 'styled-components';
import Logout from '../../assets/images/Logout.png';
import MyPage from '../../assets/images/MyPage.png';
import Pay from '../../assets/images/Pay.png';
import HeaderNav from '../atoms/HeaderNav';

const MenuContainer = styled.ul`
  list-style: none;
  width: 100%;
  margin-bottom: 4%;
`;

const HeaderNavs = () => {
  return (
    <MenuContainer>
      <HeaderNav imageSrc={Pay} menu='결제하기' />
      <HeaderNav imageSrc={MyPage} menu='내 질문 목록' />
      <HeaderNav imageSrc={Logout} menu='로그아웃' />
    </MenuContainer>
  );
};

export default HeaderNavs;
