import React, { useState } from "react";
import styled from "styled-components";
import { mainGradient } from "../../styles/styleUtil";
import ShadowBox from "../UI/atoms/ShadowBox";
import defaultUserProfile from "../../assets/images/defaultProfile.png";
import submitButton from "../../assets/images/submitButton.svg";
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
  const [images, setImages] = useState([]);
  const maxNumber = 5;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

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
                  placeholder="제목을 입력하세요."
                  style={{ width: "500px", height: "30px", border: 0 }}
                ></input>
              </InputBox>
            </form>
            <MySelect>
              <option>Languages</option>
              <option>C</option>
              <option>C++</option>
              <option>C#</option>
              <option>Python</option>
              <option>Java</option>
              <option>Java Script</option>
              <option>Ruby</option>
              <option>Go</option>
              <option>PHP</option>
            </MySelect>
            <button
              style={{
                backgroundColor: "white",
                border: 0,
                height: "26px",
                cursor: "pointer",
              }}
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
              value={images}
              onChange={onChange}
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
                    <div key={index} className="image-item">
                      <div>
                        <img
                          src={image.dataURL}
                          alt=""
                          width="100"
                          height="100"
                          style={{ margin: "1rem" }}
                        />
                        <button
                          className="image-item__btn-Wrapper"
                          onClick={() => onImageRemove(index)}
                        >
                          사진 삭제
                        </button>
                      </div>
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
