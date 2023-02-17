import React from 'react';
import styled, { css } from 'styled-components';
import { shadow } from '../../styles/styleUtil';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { headerVisibilityAtom } from '../../recoil/atom/headerVisibilityAtom';
import Logo from '../../assets/images/Logo.png';
import defaultProfile from '../../assets/images/defaultProfile.svg';

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

const profileCss = css`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 11rem;
  color: black;
`;

const SignInLink = styled(Link)`
  ${profileCss}
  text-decoration: none;
`;

const SignInImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Header = () => {
  const headerVisibility = useRecoilValue<number>(headerVisibilityAtom);

  return (
    <>
      <HeaderBox>
        <LogoLink to='/'>
          <img src={Logo} alt='Home Logo' />
        </LogoLink>
        {headerVisibility === 1 ? (
          <SignInLink to='/signIn'>
            로그인 해주세요.
            <SignInImage src={defaultProfile} alt='프로필 사진' />
          </SignInLink>
        ) : (
          <></>
        )}
      </HeaderBox>
    </>
  );
};

export default Header;
