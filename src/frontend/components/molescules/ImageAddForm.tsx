import React, { useState } from 'react';
import styled from 'styled-components';
import SignupDefaultImage from '../../assets/images/SignupDefaultImage.png';
import AddBtnImage from '../../assets/images/AddBtnImage.png';

interface ImageSizeProps {
  width?: number;
  height?: number;
}

interface ImageAddFormProps extends ImageSizeProps {
  setProfileImage: React.Dispatch<React.SetStateAction<Blob | undefined>>;
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
  width: ${(props) => props.width || 204}px;
  height: ${(props) => props.height || 204}px;
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

const AddBtn = styled.img<ImageSizeProps>`
  height: ${(props) => props.width || 204}* 5.7px;
  width: ${(props) => props.width || 204}* 5.7px;
  position: absolute;
  top: 75%;
  right: 0;
  cursor: pointer;
`;

const ImageAddForm = ({ width, height, setProfileImage }: ImageAddFormProps) => {
  const [profile, setprofile] = useState<string>(SignupDefaultImage);

  const setProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
