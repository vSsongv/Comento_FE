import React, { useState } from 'react';
import styled from 'styled-components';
import { border } from '../../../styles/styleUtil';
import Drag_files_to_upload from '../../../assets/images/Drag_files_to_upload.png';
import ImageUpload from '../../../assets/images/imageUpload.png';
import Image from '../../atoms/Image';

const UploadBox = styled.div`
  width: 20%;
  height: 100%;
  ${border(1)}
`;

const CustomInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

const UploadHidden = styled.input`
  display: none;
`;

interface Props {
  formData: FormData;
}

const QuestionFile = ({ formData }: Props) => {
  const [imageList, setImageList] = useState<string[]>([]);

  const fileDelete = (deleteIndex: number): void => {
    const newFileList = formData.getAll('images').filter((item, index) => index !== deleteIndex);
    formData.delete('images');
    for (let i = 0; i < newFileList.length; i++) {
      formData.append('images', newFileList[i]);
    }
    setImageList(imageList.filter((item, index) => index !== deleteIndex));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileList = e.target.files;
    const nowImageList = [...imageList];
    if (fileList && fileList[0]) {
      if (imageList.length + fileList.length > 4) {
        alert('등록할 수 있는 사진은 최대 4개입니다.');
        return;
      }
      for (let i = 0; i < fileList.length; i++) {
        formData.append('images', fileList[i]);
        const nowImageUrl: string = URL.createObjectURL(fileList[i]);
        nowImageList.push(nowImageUrl);
      }
      setImageList(nowImageList);
    }
  };

  return (
    <>
      <UploadBox>
        <label htmlFor='file'>
          <CustomInput>
            <img src={ImageUpload} />
            <img src={Drag_files_to_upload} />
          </CustomInput>
        </label>
        <UploadHidden
          type='file'
          name='file'
          id='file'
          accept='.jpg, .jpeg, .png, .img'
          onChange={handleFile}
          multiple
        />
      </UploadBox>
      <Image imageList={imageList} fileDelete={fileDelete} />
    </>
  );
};

export default QuestionFile;
