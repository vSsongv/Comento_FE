import React from 'react';
import styled, { css } from 'styled-components';
import { shadow } from '../../styles/styleUtil';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { headerVisibilityAtom, UserInfoType, userInfo } from '../../recoil/atom/headerVisibilityAtom';
import Logo from '../../assets/images/Logo.png';
import defaultProfile from '../../assets/images/defaultProfile.svg';
import mentos from '../../assets/images/mentos.png';

const HeaderBox = styled.div`
  position: relative;
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
  width: 14vw;
  color: black;
`;

const SignInLink = styled(Link)`
  ${profileCss}
  text-decoration: none;
`;

const Profile = styled.button`
  all: unset;
  ${profileCss}
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Header = () => {
  const headerVisibility = useRecoilValue<number>(headerVisibilityAtom);
  const user = useRecoilValue<UserInfoType>(userInfo);

  return (
    <>
      <HeaderBox>
        <LogoLink to='/'>
          <img src={Logo} alt='Home Logo' />
        </LogoLink>
        {headerVisibility === 1 ? (
          <SignInLink to='/signIn'>
            로그인 해주세요.
            <ProfileImage src={defaultProfile} alt='프로필 이미지' />
          </SignInLink>
        ) : (
          <Profile>
            <img src={mentos} alt='멘토스 이미지' width='30rem' />내 멘토스 {user.mentos}개
            <ProfileImage src={user.profileImage} alt='프로필 이미지' />
          </Profile>
        )}
      </HeaderBox>
    </>
  );
};

export default Header;
