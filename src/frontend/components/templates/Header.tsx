import React from 'react';
import styled from 'styled-components';
import { shadow } from '../../styles/styleUtil';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { headerVisibilityAtom } from '../../recoil/atom/headerVisibilityAtom';
import Logo from '../../assets/images/Logo.png';
import HeaderLogin from '../organisms/HeaderLogin';

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
  const headerVisibility = useRecoilValue<number>(headerVisibilityAtom);

  return (
    <HeaderBox>
      <LogoLink to='/'>
        <img src={Logo} alt='Home Logo' />
      </LogoLink>
      {headerVisibility === 1 ? <HeaderLogin /> : <h1>good</h1>}
    </HeaderBox>
  );
};

export default Header;
