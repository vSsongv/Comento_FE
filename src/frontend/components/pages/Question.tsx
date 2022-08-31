import { Languages } from "./../utils/Languages";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { mainGradient } from "../../styles/styleUtil";
import ShadowBox from "../UI/atoms/ShadowBox";
import defaultUserProfile from "../../assets/images/defaultProfile.svg";
import submitButton from "../../assets/images/submit.svg";
import gallery from "../../assets/images/gallery.png";
import ImageUploading, { ImageListType } from "react-images-uploading";

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

const ContentBox = styled.div`
  height: 49%;
  padding: 2rem 3rem;
  border-bottom: 1px solid #a8a8a8;
`;
const ImageBox = styled.div`
  height: 36%;
  padding-right: 1rem;
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

const ImageButton = styled.button`
  display: block;
  width: 200px;
  height: 150px;
  border: 0;
  padding: 0;
  cursor: pointer;
  z-index: 0;
  border-right: solid 0.7px #a8a8a8;
  background-color: white;
`;

function Ask() {
  const [postImage, setpostImage] = useState([]);
  const maxNumber = 6;
  const [values, setValue] = useState({
    postLang: "",
    postTitle: "",
    postContent: "",
    postImage,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  // const handleSubmit = async () => {
  //   try {
  //    axios.post()
  //   } catch() {

  //   }
  // }

  return (
    <div>
      <BoxContainer>
        <AskBox>
          <GradientTopLine />
          <TitleBox>
            <UserImg src={defaultUserProfile} />
            <form style={{ display: "flex", alignItems: "center" }}>
              <Label>제목</Label>
              <InputBox>
                <input
                  value={values.postTitle}
                  name="postTitle"
                  onChange={handleChange}
                  placeholder="제목을 입력하세요."
                  style={{ width: "500px", height: "30px", border: 0 }}
                ></input>
              </InputBox>
            </form>

            <form style={{ height: "55px" }}>
              <MySelect>
                {Languages.map((lang: string, index: number) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </MySelect>
            </form>
            <button
              style={{
                backgroundColor: "white",
                border: 0,
                height: "26px",
                cursor: "pointer",
              }}
              // onClick={handleSubmit}
            >
              <img src={submitButton} />
            </button>
          </TitleBox>
          <ContentBox>
            <form
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Label>내용</Label>
              <InputBox>
                <textarea
                  placeholder="내용을 입력해주세요."
                  rows={10}
                  cols={110}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                    lineHeight: "1.3rem",
                    resize: "none",
                  }}
                ></textarea>
              </InputBox>
            </form>
          </ContentBox>
          <ImageBox>
            <ImageUploading
              multiple
              value={postImage}
              onChange={handleImgChange}
              maxNumber={maxNumber}
            >
              {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
                <div
                  className="upload__image-wrapper"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ImageButton onClick={onImageUpload} {...dragProps}>
                    <img src={gallery} />
                    <p style={{ color: "#858585" }}>Click or Drop here</p>
                  </ImageButton>
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="image-item"
                      style={{
                        width: "100px",
                        height: "100px",
                        position: "relative",
                        margin: "1rem",
                      }}
                    >
                      <img
                        src={image.dataURL}
                        alt=""
                        width="100"
                        height="100"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                        }}
                      />
                      <div
                        className="close"
                        style={{ cursor: "pointer" }}
                        onClick={() => onImageRemove(index)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </ImageBox>
        </AskBox>
      </BoxContainer>
    </div>
  );
}

export default Ask;
