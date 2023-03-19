import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import SignupDefaultImage from '../../assets/images/SignupDefaultImage.png';
import { userInfo, UserInfoType } from '../../recoil/atom';
import FlashBtn from '../atoms/FlashBtn';
import ImageAddForm from '../molescules/ImageAddForm';

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.text`
  font-family: 'NanumGothic';
  font-size: 20px;
  font-weight: 600;
  float: left;
`;

const Name = styled.text`
  font-family: 'NanumGothic';
  font-size: 25px;
  font-weight: 700;
`;

const Email = styled.text`
  font-family: 'NanumGothic';
  font-size: 15px;
`;

const Wrapper = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const MyPageProfile = () => {
  const user = useRecoilValue<UserInfoType>(userInfo);
  const [profileImage, setProfileImage] = useState<Blob>();

  return (
    <Container>
      <Title>프로필</Title>
      <ImageAddForm width={120} height={120} setProfileImage={setProfileImage} />
      <Wrapper>
        <Name>{user.nickname}</Name>
        <Email>{user.email}</Email>
        <FlashBtn width={160}>답변자 권한 요청하기</FlashBtn>
      </Wrapper>
    </Container>
  );
};

export default MyPageProfile;
