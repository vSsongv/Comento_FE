import React, { useState, RefObject } from "react";
import styled from "styled-components";
import { border } from "../../../../styles/styleUtil";
import Drag_files_to_upload from "../../../../assets/images/Drag_files_to_upload.png";
import ImageUpload from "../../../../assets/images/imageUpload.png";

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

const Image = styled.img`
  width: 9rem;
  margin: 0 1rem;
`;

interface Props {
  formData: FormData;
}

function QuestionFile({ formData }: Props) {
  const [imageList, setImageList] = useState<string[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const nowImageList = [...imageList];
    if (fileList && fileList[0]) {
      if (imageList.length + fileList.length > 4) {
        alert("등록할 수 있는 사진은 최대 4개입니다.");
        return;
      }
      for (let i = 0; i < fileList.length; i++) {
        formData.append("images", fileList[i]);
        const nowImageUrl: string = URL.createObjectURL(fileList[i]);
        nowImageList.push(nowImageUrl);

        console.log(formData.get("images"));
      }
      setImageList(nowImageList);
    }
  };

  return (
    <>
      <UploadBox>
        <label htmlFor="file">
          <CustomInput>
            <img src={ImageUpload} />
            <img src={Drag_files_to_upload} />
          </CustomInput>
        </label>
        <UploadHidden
          type="file"
          name="file"
          id="file"
          accept=".jpg, .jpeg, .png, .img"
          onChange={handleFile}
          multiple
        />
      </UploadBox>
      {imageList.map((url: string) => {
        return <Image key={url} src={url} />;
      })}
    </>
  );
}

export default QuestionFile;
