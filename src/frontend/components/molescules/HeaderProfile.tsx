import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { border } from '../../styles/styleUtil';
import SimpleProfile from '../atoms/SimpleProfile';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  height: 53%;
`;

const ProfileEdit = styled(Link)`
  border-radius: 10px;
  background-color: white;
  padding: 2px 0;
  font-size: small;
  text-decoration: none;
  text-align: center;
  color: black;
  ${border(0)}
  ${border(1)}
  ${border(2)}
  ${border(3)}
  cursor: pointer;
`;

const HeaderProfile = () => {
  return (
    <ProfileContainer>
      <SimpleProfile height='10rem' />
      <ProfileEdit to='/question'>프로필 수정</ProfileEdit>
    </ProfileContainer>
  );
};

export default HeaderProfile;
