import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserInfoType, userInfo } from '../../recoil/atom';
import mentos from '../../assets/images/mentos.png';

interface SimpleProfileProps {
  height: string;
}

const ProfileContainer = styled.div<SimpleProfileProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => props.height};
`;

const ProfileImage = styled.img`
  width: 100%;
  border-radius: 100%;
`;

const Mentos = styled.div`
  display: flex;
  align-items: center;
`;

const SimpleProfile = ({ height }: SimpleProfileProps) => {
  const user = useRecoilValue<UserInfoType>(userInfo);

  return (
    <ProfileContainer height={height}>
      <ProfileImage src={user.profileImage} alt='프로필 이미지' />
      {user.name}
      <Mentos>
        <img src={mentos} alt='멘토스 이미지' width='25rem' />
        {user.mentos}개
      </Mentos>
    </ProfileContainer>
  );
};

export default SimpleProfile;
