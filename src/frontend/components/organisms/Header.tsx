import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { shadow } from '../../styles/styleUtil';
import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { signInState, UserInfoType, userInfo, headerMenu } from '../../recoil/atom/headerVisibilityAtom';
import HeaderMenu from './HeaderMenu';
import Logo from '../../assets/images/Logo.png';
import defaultProfile from '../../assets/images/defaultProfile.svg';
import mentos from '../../assets/images/mentos.png';
import useClickState from '../../hooks/useClickState';

const HeaderBox = styled.div`
  position: sticky;
  top: 0;
  /* transform: translateY(); */
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
  width: 13rem;
  color: black;
`;

const SignInLink = styled(Link)`
  ${profileCss}
  text-decoration: none;
`;

const Profile = styled.button`
  all: unset;
  height: 5rem;
  ${profileCss}
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
`;

const Header = () => {
  const [headerState, setHeaderState] = useRecoilState<boolean>(headerMenu);
  const [searchInputRef, handleClickOutside] = useClickState(setHeaderState);
  const isSignIn = useRecoilValue<boolean>(signInState);
  const user = useRecoilValue<UserInfoType>(userInfo);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchInputRef]);

  const menuToggle = () => {
    setHeaderState(!headerState);
  };

  return (
    <>
      <HeaderBox>
        <LogoLink to='/'>
          <img src={Logo} alt='Home Logo' />
        </LogoLink>
        {isSignIn ? (
          <div ref={searchInputRef}>
            <Profile onClick={menuToggle}>
              <img src={mentos} alt='멘토스 이미지' width='30rem' />내 멘토스 {user.mentos}개
              <ProfileImage src={user.profileImage} alt='프로필 이미지' />
            </Profile>
            {headerState ? <HeaderMenu /> : null}
          </div>
        ) : (
          <SignInLink to='/signIn'>
            로그인 해주세요.
            <ProfileImage src={defaultProfile} alt='프로필 이미지' />
          </SignInLink>
        )}
      </HeaderBox>
    </>
  );
};

export default Header;
