import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignInLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

function HeaderLogin() {
  return <SignInLink to='/signIn'>로그인이 필요합니다.</SignInLink>;
}

export default HeaderLogin;
