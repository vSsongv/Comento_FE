import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { modalVisibleState, userInfo, UserInfoType } from '../../../recoil/atom';
import { changeProfile } from '../../../api/userService';
import FlashBtn from '../../atoms/FlashBtn';
import ImageAddForm from '../../molescules/ImageAddForm';
import Modal from '../Modal';
import MentoAuthReq from '../../molescules/MentoAuthReq';

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-right: 30px;
`;

const Title = styled.span`
  text-align: center;
  display: block;
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
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const MentoRole = styled.div`
  background-image: linear-gradient(90deg, #033bff, #00dbf8);
  color: white;
  border-radius: 10px;
  width: 155px;
  height: 30px;
  font-size: 15px;
  font-weight: 600;
  padding-top: 5px;
  text-align: center;
  font-family: 'NanumGothic';
`;

const MyProfile = () => {
  const [profileImage, setProfileImage] = useState<Blob>();
  const [user, setUser] = useRecoilState<UserInfoType>(userInfo);
  const [modalVisible, setModalVisible] = useRecoilState<boolean>(modalVisibleState);

  const setNewProfile = async (): Promise<void> => {
    const formData: FormData = new FormData();
    formData.append('images', profileImage ?? '');
    const newProfile = await changeProfile(formData);
    setUser({ ...user, profileImage: process.env.REACT_APP_BASE_URL + newProfile });
  };

  return (
    <Container>
      <Title>프로필</Title>
      <ImageAddForm width={140} height={140} setProfileImage={setProfileImage} />
      <SetProfileBtn onClick={setNewProfile}>현재 프로필 저장</SetProfileBtn>
      <Wrapper>
        <Name>{user.nickname}</Name>
        <Email>{user.email}</Email>
        {user.role === 'Q' ? (
          <FlashBtn onClick={() => setModalVisible(true)} width={155}>
            답변 권한 요청하기
          </FlashBtn>
        ) : (
          <MentoRole>답변 권한 승인 완료</MentoRole>
        )}
      </Wrapper>
      {modalVisible ? <Modal title={'답변 권한 요청하기'} content={MentoAuthReq}></Modal> : null}
    </Container>
  );
};

export default MyProfile;
