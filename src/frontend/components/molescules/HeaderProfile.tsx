import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { headerMenu } from '../../recoil/atom';
import { border } from '../../styles/styleUtil';
import SimpleProfile from '../atoms/SimpleProfile';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  height: 60%;
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
  const [headerState, setHeaderState] = useRecoilState(headerMenu);

  return (
    <ProfileContainer>
      <SimpleProfile height='83%' />
      <ProfileEdit to='/MyPage' onClick={() => setHeaderState(!headerState)}>
        프로필 수정
      </ProfileEdit>
    </ProfileContainer>
  );
};

export default HeaderProfile;
