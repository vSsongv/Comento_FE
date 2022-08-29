import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BorderedButton = styled(Link)`
  text-decoration: none;
  color: black;
`;

function HeaderLogin() {
  return <BorderedButton to='/signin'>로그인이 필요합니다.</BorderedButton>;
}

export default HeaderLogin;
