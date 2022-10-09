import { Languages } from "./../utils/Languages";
import React, {
  EventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import styled from "styled-components";
import axios from "axios";
import { mainGradient } from "../../styles/styleUtil";
import ShadowBox from "../UI/atoms/ShadowBox";
import submitButton from "../../assets/images/submit.svg";
import gallery from "../../assets/images/gallery.png";
import SelectArrow from "../../assets/images/SelectArrow.png";
import ImageUploading, { ImageListType } from "react-images-uploading";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 55px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.04);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const AskBox = styled(ShadowBox)`
  width: 1002px;
  height: 501px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const GradientTopLine = styled.div`
  width: 100%;
  height: 30px;
  float: left;
  ${mainGradient};
`;

const AskBoxBody = styled.div`
  width: 100%;
  height: 470px;
  box-sizing: border-box;
  padding: 0 25px;
`;

const VerticalDivider = styled.div`
  width: 0.7px;
  height: calc(100% - 26px);
  background: #a8a8a8;
  margin: 13px 0;
`;

const BreadthDivider = styled.div`
  width: 100%;
  height: 0.7px;
  background: #a8a8a8;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  width: 680px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const Label = styled.div`
  width: 72px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 500px;
  height: 30px;
  border: none;
  box-sizing: border-box;
  padding: 0 0 0 10px;
  color: #858585;
`;

const ContentBox = styled.div`
  height: 49%;
  padding: 2rem 3rem;
  border-bottom: 1px solid #a8a8a8;
`;

const LangSelect = styled.div`
  width: 214px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  cursor: pointer;
`;

const LangOptionContainer = styled.div`
  width: 214px;
  background: #fff;
  box-sizing: border-box;
  padding: 9px 0;
  position: relative;
`;

const LangOption = ({
  lang,
  onClick,
}: {
  lang: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  const [mouseEntered, setMouseEntered] = useState<boolean>(false);
  const handleMouseEnter = (): void => {
    setMouseEntered(true);
  };
  const handleMouseOut = (): void => {
    setMouseEntered(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "37px",
        display: "flex",
        alignItems: "center",
        background: mouseEntered ? "#e2e2e2" : "#fff",
        boxSizing: "border-box",
        padding: "0 20px",
        cursor: "pointer",
        zIndex: 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
      onClick={onClick}
    >
      {lang}
    </div>
  );
};

const LangTypo = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
`;

const SelectButtonArrow = styled.img`
  width: 15px;
  height: 7px;
`;

const LangForm = styled.div`
  height: 55px;
`;

const SubmitButton = styled.button`
  width: 50px;
  height: 26px;
  background: #fff;
  border: none;
  margin: auto;
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

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue({ ...values, [name]: value });
    // refactor
    console.log(values);
  };

  const handleSubmit = () => {
    console.log("handlesubmit");
  };

  const [langClicked, setLangClicked] = useState<boolean>(false);
  const handleLangSelect = (): void => {
    console.log("Select button clicked");
    setLangClicked((prev) => !prev);
  };

  const [selected, setSelected] = useState<string>("C");
  const selectOnClick = (typo: string): void => {
    setSelected(typo);
    setLangClicked(false);
  };

  return (
    <Container>
      <AskBox>
        <GradientTopLine />
        <AskBoxBody>
          <TitleBox>
            <Title>
              <Label>제목</Label>
              <TitleInput
                onChange={handleTitleInput}
                placeholder="제목을 입력하세요."
              />
            </Title>

            <VerticalDivider></VerticalDivider>

            <LangForm>
              <LangSelect onClick={handleLangSelect}>
                <LangTypo>{selected}</LangTypo>
                <SelectButtonArrow src={SelectArrow} />
              </LangSelect>
              {langClicked ? (
                <LangOptionContainer>
                  <LangOption
                    lang={"C"}
                    onClick={() => {
                      selectOnClick("C");
                    }}
                  />
                  <LangOption
                    lang={"C++"}
                    onClick={() => {
                      selectOnClick("C++");
                    }}
                  />
                  <LangOption
                    lang={"Java"}
                    onClick={() => {
                      selectOnClick("Java");
                    }}
                  />
                  <LangOption
                    lang={"Python"}
                    onClick={() => {
                      selectOnClick("Python");
                    }}
                  />
                  <LangOption
                    lang={"Kotlin"}
                    onClick={() => {
                      selectOnClick("Kotlin");
                    }}
                  />
                  <LangOption
                    lang={"Web"}
                    onClick={() => {
                      selectOnClick("Web");
                    }}
                  />
                  <LangOption
                    lang={"C#"}
                    onClick={() => {
                      selectOnClick("C#");
                    }}
                  />
                  <LangOption
                    lang={"Assembly"}
                    onClick={() => {
                      selectOnClick("Assembly");
                    }}
                  />
                </LangOptionContainer>
              ) : null}
            </LangForm>

            <VerticalDivider></VerticalDivider>

            <SubmitButton onClick={handleSubmit}>
              <img src={submitButton} />
            </SubmitButton>
          </TitleBox>
          <BreadthDivider></BreadthDivider>
          <ContentBox>
            <ContentForm>
              <Label>내용</Label>
              <ContentInput
                placeholder="내용을 입력해주세요."
                rows={10}
                cols={110}
              ></ContentInput>
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
        </AskBoxBody>
      </AskBox>
    </Container>
  );
};

export default Ask;
