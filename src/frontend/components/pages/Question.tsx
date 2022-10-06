import { Languages } from "./../utils/Languages";
import React, { EventHandler, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { mainGradient } from "../../styles/styleUtil";
import ShadowBox from "../UI/atoms/ShadowBox";
import defaultUserProfile from "../../assets/images/defaultProfile.svg";
import submitButton from "../../assets/images/submit.svg";
import gallery from "../../assets/images/gallery.png";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { string } from "prop-types";

const BoxContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const AskBox = styled(ShadowBox)`
  max-width: 1000px;
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 105px;
`;

const GradientTopLine = styled.div`
  width: 100%;
  height: 2rem;
  float: left;
  ${mainGradient};
`;

const TitleBox = styled.div`
  width: 100%;
  clear: both;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem 2rem;
  border-bottom: 1px solid #a8a8a8;
`;

const TitleForm = styled.form`
  display: flex;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 500px;
  height: 30px;
  border: none;
`;

const ContentBox = styled.div`
  height: 49%;
  padding: 2rem 3rem;
  border-bottom: 1px solid #a8a8a8;
`;

const UserImg = styled.img``;

const Label = styled.label`
  float: left;
  padding: auto;
`;

const InputBox = styled.span`
  display: block;
  overflow: hidden;
  padding-left: 1rem;
`;

const MySelect = styled.select`
  width: 12rem;
  height: 100%;
  border: 0;
  border-left: solid 0.7px #a8a8a8;
  border-right: solid 0.7px #a8a8a8;
  padding-left: 10px;
  line-height: 1rem;
  cursor: pointer;
`;

const LangForm = styled.form`
  height: 55px;
`;

const SubmitButton = styled.button`
  height: 26px;
  background: white;
  border: none;
  cursor: pointer;
`;

const ImageBox = styled.div`
  height: 36%;
  padding-right: 1rem;
`;

const ImageButton = styled.button`
  width: 200px;
  height: 150px;
  display: block;
  background: white;
  border: none;
  border-right: solid 0.7px #a8a8a8;
  padding: 0;
  cursor: pointer;
  z-index: 0;
`;

const ContentForm = styled.form`
  width: 100%;
  height: 100%;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  line-height: 20.8px;
  resize: none;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  width: 130px;
  height: 117px;
  margin: 16px;
  position: relative;
`;

const ImagePrev = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Ask = (): JSX.Element => {
  interface postInfo {
    lang: string;
    title: string;
    content: string;
    image?: unknown;
  }

  const [postImage, setpostImage] = useState([]);
  const maxNumber = 6;
  const [values, setValue] = useState<postInfo>({
    lang: "",
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleImgChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setpostImage(imageList as never[]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = () => {
    console.log("handlesubmit");
  };

  return (
    <>
      <BoxContainer>
        <AskBox>
          <GradientTopLine />
          <TitleBox>
            <UserImg src={defaultUserProfile} />
            <TitleForm>
              <Label>제목</Label>
              <InputBox>
                <TitleInput
                  value={values.title}
                  name="postTitle"
                  onChange={handleChange}
                  placeholder="제목을 입력하세요."
                />
              </InputBox>
            </TitleForm>

            <LangForm>
              <MySelect>
                {Languages.map((lang: string, index: number) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </MySelect>
            </LangForm>
            <SubmitButton onClick={handleSubmit}>
              <img src={submitButton} />
            </SubmitButton>
          </TitleBox>
          <ContentBox>
            <ContentForm>
              <Label>내용</Label>
              <InputBox>
                <ContentInput
                  placeholder="내용을 입력해주세요."
                  rows={10}
                  cols={110}
                ></ContentInput>
              </InputBox>
            </ContentForm>
          </ContentBox>
          <ImageBox>
            <ImageUploading
              multiple
              value={postImage}
              onChange={handleImgChange}
              maxNumber={maxNumber}
            >
              {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
                <ImageContainer className="upload__image-wrapper">
                  <ImageButton onClick={onImageUpload} {...dragProps}>
                    <img src={gallery} />
                    <p style={{ color: "#858585" }}>Click or Drop here</p>
                  </ImageButton>
                  {imageList.map((image, index) => (
                    <Image key={index} className="image-item">
                      <ImagePrev src={image.dataURL} alt="" />
                      <div
                        className="close"
                        style={{ cursor: "pointer" }}
                        onClick={() => onImageRemove(index)}
                      />
                    </Image>
                  ))}
                </ImageContainer>
              )}
            </ImageUploading>
          </ImageBox>
        </AskBox>
      </BoxContainer>
    </>
  );
};

export default Ask;
