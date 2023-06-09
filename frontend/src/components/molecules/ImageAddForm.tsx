import React, { useState } from 'react';
import styled from 'styled-components';
import AddBtnImage from '../../assets/images/AddBtnImage.png';
import { useRecoilValue } from 'recoil';
import { userInfo, UserInfoType } from '../../recoil/atom';

interface ImageSizeProps {
  width: number;
  height: number;
}

interface ImageAddFormProps extends ImageSizeProps {
  setProfileImage: React.Dispatch<React.SetStateAction<Blob | undefined>>;
  setIsChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @author Ssong
 * @description ImageAddForm Molescules
 * @param {Props} width set width
 * @param {Props} height set height
 * @param {Props} imageUrl imageUrl for background
 *
 * @example
 * <ImageAddForm width={10}></ImageAddForm>
 **/

const Input = styled.input`
  display: none;
`;

const ImageAddBtnContainer = styled.div<ImageSizeProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const ImageArea = styled.img`
  height: 100%;
  width: 100%;
  border: 0;
  border-radius: 100px;
  background-size: 100%;
  cursor: pointer;
`;

const AddBtn = styled.img`
  position: absolute;
  top: 75%;
  right: 0;
  cursor: pointer;
`;

const ImageAddForm = ({ width, height, setProfileImage, setIsChanged }: ImageAddFormProps) => {
  const user = useRecoilValue<UserInfoType>(userInfo);
  const [profile, setprofile] = useState<string>(user.profileImage);

  const setProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setIsChanged) {
      setIsChanged(true);
    }
    const file = e.target.files;
    if (file && file[0]) {
      const profileUrl = URL.createObjectURL(file[0]);
      setprofile(profileUrl);
      setProfileImage(file[0]);
    }
  };

  return (
    <>
      <Input onChange={setProfile} type='file' name='file' id='file' accept='image/*'></Input>
      <ImageAddBtnContainer width={width} height={height}>
        <label htmlFor='file'>
          <ImageArea src={profile} />
          <AddBtn src={AddBtnImage} />
        </label>
      </ImageAddBtnContainer>
    </>
  );
};

export default ImageAddForm;
