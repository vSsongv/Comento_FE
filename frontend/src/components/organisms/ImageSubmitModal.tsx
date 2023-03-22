import React from 'react';
import styled from 'styled-components';
import useKeyEscClose from '../../hooks/useKeyEscClose';
import Button from '../atoms/Button';
import FlashBtn from '../atoms/FlashBtn';
import { Background } from '../atoms/ImageViewModal';

const ImageSubmitForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 28rem;
  height: 34rem;
  padding: 3rem;
  background-color: white;
`;

const Image = styled.img`
  width: 20rem;
  height: 20rem;
  margin-top: 3.5rem;
`;

const CommitMessage = styled.p`
  margin: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 14rem;
`;

interface Props {
  imageSrc: string;
  cancel: () => void;
  submit: () => void;
}

const ImageSubmitModal = ({ imageSrc, cancel, submit }: Props) => {
  useKeyEscClose(cancel);

  return (
    <Background>
      <ImageSubmitForm>
        <Image src={imageSrc} />
        <CommitMessage>사진을 전송하시겠습니까?</CommitMessage>
        <ButtonContainer>
          <FlashBtn width={100} height={30} onClick={cancel}>
            취소
          </FlashBtn>
          <Button width={100} height={30} onClick={submit}>
            전송
          </Button>
        </ButtonContainer>
      </ImageSubmitForm>
    </Background>
  );
};

export default ImageSubmitModal;
