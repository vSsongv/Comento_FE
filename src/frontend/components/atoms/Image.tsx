import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

interface ImageProp {
  isDeleteFunction: boolean;
}
const ImageBox = styled.div`
  /* position: relative; */
  margin: 0 1rem;
`;

const Images = styled.img<ImageProp>`
  z-index: 0;
  position: ${(props) => (props.isDeleteFunction ? 'absolute' : 'static')};
  margin: ${(props) => (props.isDeleteFunction ? '0' : '10px 0')};
  width: 9rem;
  height: 9rem;
  border: ${(props) => (props.isDeleteFunction ? 'solid 0.5px' : 'none')};
  border-radius: 10px;
`;

const XIcon = styled.div`
  /* position: absolute; */
  position: sticky;
  z-index: 9;
  margin-left: 7.2rem;
  padding: 0.3rem;
  cursor: pointer;
`;

interface Props {
  imageList: string[];
  fileDelete?: (deleteIndex: number) => void;
}

const Image = ({ imageList, fileDelete }: Props) => {
  return (
    <>
      {imageList.map((url: string, index: number) => {
        return (
          <ImageBox key={url}>
            <Images src={url} isDeleteFunction={fileDelete ? true : false} />
            {fileDelete && (
              <XIcon onClick={() => fileDelete(index)}>
                <MdClose style={{ padding: '0.1rem', fontSize: '1.2rem' }} />
              </XIcon>
            )}
          </ImageBox>
        );
      })}
    </>
  );
};

export default Image;
