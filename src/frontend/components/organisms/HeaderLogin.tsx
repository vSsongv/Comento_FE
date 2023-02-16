import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/images/defaultProfile.svg';

const SignInLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 11rem;
  text-decoration: none;
  color: black;
`;

const SignInImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

function HeaderLogin() {
  return (
    <SignInLink to='/signIn'>
      로그인 해주세요.
      <SignInImage src={defaultProfile} alt='프로필 사진' />
    </SignInLink>
  );
}

export default HeaderLogin;
