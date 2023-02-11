import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import SignupDefaultImage from '../../../assets/images/SignupDefaultImage.png';
import AddBtnImage from '../../../assets/images/AddBtnImage.png';

interface ImageAddFormProps {
  width?: number;
  height?: number;
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

const ImageAddBtnContainer = styled.div<ImageAddFormProps>`
  width: ${(props) => props.width || 204}px;
  height: ${(props) => props.height || 204}px;
  position: relative;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 30px;
`;

// const [profile, setprofile] = useState<string>(SignupDefaultImage);

const ImageArea = styled.div`
  height: 100%;
  width: 100%;
  border: 0;
  border-radius: 100px;
  background-size: 100%;
  /* background-image: url('profile값써야됨'); */
  background-image: url(${SignupDefaultImage});
  cursor: pointer;
`;

const AddBtn = styled.img<ImageAddFormProps>`
  height: ${(props) => props.width || 204}* 5.7px;
  width: ${(props) => props.width || 204}* 5.7px;
  position: absolute;
  top: 75%;
  right: 0;
  cursor: pointer;
`;

// const setProfile = () => {
//   console.log('ddd');
// };

const ImageAddForm = ({ width, height }: ImageAddFormProps) => {
  return (
    <>
      <Input type='file' name='file' id='file' accept='image/*'></Input>
      <ImageAddBtnContainer width={width} height={height}>
        <label htmlFor='file'>
          <ImageArea />
          <AddBtn src={AddBtnImage} />
        </label>
      </ImageAddBtnContainer>
    </>
  );
};

export default ImageAddForm;
