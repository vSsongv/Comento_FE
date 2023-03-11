import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfo, UserInfoType } from '../../recoil/atom';
import { changeProfile } from '../../api/userService';
import FlashBtn from '../atoms/FlashBtn';
import ImageAddForm from '../molescules/ImageAddForm';

const Container = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  margin-right: 30px;
`;

const Title = styled.span`
  font-family: 'NanumGothic';
  font-size: 20px;
  font-weight: 600;
`;

const Name = styled.span`
  font-family: 'NanumGothic';
  font-size: 25px;
  font-weight: 700;
`;

const Email = styled.span`
  font-family: 'NanumGothic';
  font-size: 15px;
`;

const SetProfileBtn = styled.button`
  position: absolute;
  top: 180px;
  left: 70px;
  width: 105px;
  height: 25px;
  color: white;
  background-color: #5666e5;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const Wrapper = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const MyProfile = () => {
  const [profileImage, setProfileImage] = useState<Blob>();
  const [user, setUser] = useRecoilState<UserInfoType>(userInfo);

  const setNewProfile = async (): Promise<void> => {
    const formData: FormData = new FormData();
    formData.append('images', profileImage ?? '');
    const newProfile = await changeProfile(formData);
    setUser({ ...user, profileImage: process.env.REACT_APP_BASE_URL + newProfile });
  };

  return (
    <Container>
      <Title>프로필</Title>
      <ImageAddForm width={130} height={130} setProfileImage={setProfileImage} />
      <SetProfileBtn onClick={setNewProfile}>현재 프로필 저장</SetProfileBtn>
      <Wrapper>
        <Name>{user.nickname}</Name>
        <Email>{user.email}</Email>
        <FlashBtn onClick={() => console.log()} width={160}>
          답변자 권한 요청하기
        </FlashBtn>
      </Wrapper>
    </Container>
  );
};

export default MyProfile;
