import React, { useEffect } from 'react';
import styled from 'styled-components';
import { shadow } from '../../styles/styleUtil';
import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { signInState, UserInfoType, userInfo, headerMenu } from '../../recoil/atom';
import HeaderMenu from './HeaderMenu';
import Logo from '../../assets/images/Logo.png';
import defaultProfile from '../../assets/images/defaultProfile.svg';
import useClickState from '../../hooks/useClickState';
import Question from '../../assets/images/Question.png';
import Edit from '../../assets/images/Edit.png';

const HeaderBox = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  width: 100%;
  padding: 0 4rem;
  background-color: white;
  z-index: 9999;
  ${shadow(1)}
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const SignInLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`;

const Profile = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  height: 5rem;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 1.5rem;
  border-radius: 100%;
`;

const QALink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`;

const QALogo = styled.img`
  margin-right: 0.5rem;
`;

const Header = () => {
  const [headerState, setHeaderState] = useRecoilState<boolean>(headerMenu);
  const UserInfo = useRecoilValue<UserInfoType>(userInfo);
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
            <Profile>
              {UserInfo.role === 'R' ? (
                <QALink to='/answer' style={{ marginRight: '1rem' }}>
                  <QALogo src={Edit} alt='Answer Logo' />
                  답변하기
                </QALink>
              ) : (
                <QALink to='/answer' style={{ marginRight: '1rem' }}>
                  <QALogo src={Edit} alt='Answer Logo' />
                  답변 권한 얻으러 가기
                </QALink>
              )}

              <QALink to='/question'>
                <QALogo src={Question} alt='Question Logo' />
                질문하기
              </QALink>
              <ProfileImage src={user.profileImage} alt='프로필 이미지' onClick={menuToggle} />
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
