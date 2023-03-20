import React, { RefObject } from 'react';
import styled from 'styled-components';
import ChattingFileInput from '../../assets/images/ChattingFileInput.png';
import SubmitIcon from '../../assets/images/QuestionSubmit.svg';

const ChattingInputContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-left: 5px;
  height: 40px;
  width: 97%;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

const UploadHidden = styled.input`
  display: none;
`;

const ContentInput = styled.input`
  width: 90%;
  padding: 0.5rem;
  border: none;
  font-size: 16px;
`;

const Submit = styled.button`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border: none;
  background-color: white;
  background-image: url(${SubmitIcon});
  cursor: pointer;
`;

interface Props {
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  messageRef: RefObject<HTMLInputElement>;
  imageRef: RefObject<HTMLInputElement>;
  sendMessage: () => void;
}

const ChattingInput = ({ handleFile, messageRef, sendMessage, imageRef }: Props) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <ChattingInputContainer onSubmit={(e) => onSubmit(e)}>
      <label htmlFor='file'>
        <InputBox>
          <img src={ChattingFileInput} alt='file input' />
        </InputBox>
      </label>
      <UploadHidden
        type='file'
        name='file'
        id='file'
        accept='.jpg, .jpeg, .png, .img'
        onChange={handleFile}
        ref={imageRef}
      />
      <ContentInput ref={messageRef} placeholder='메세지를 입력해주세요.' />
      <Submit />
    </ChattingInputContainer>
  );
};

export default ChattingInput;
