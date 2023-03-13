import React from 'react';
import { MdClose } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { modalVisibleState } from '../../recoil/atom';

interface ModalProps {
  title: string;
  content: () => JSX.Element;
}

const Container = styled.div`
  background-color: white;
  padding: 30px;
  width: 680px;
  position: absolute;
  top: 15%;
  left: 35%;
  z-index: 100;
`;

const XIcon = styled.button`
  border: none;
  position: absolute;
  right: 0;
  padding-right: 25px;
  background-color: transparent;
  cursor: pointer;
`;

const Title = styled.span`
  color: black;
  display: block;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
`;

const Modal = ({ title, content }: ModalProps) => {
  const Content = content;
  const setModalVisible = useSetRecoilState(modalVisibleState);

  return (
    <Container>
      <XIcon onClick={() => setModalVisible(false)}>
        <MdClose style={{ padding: '0.1rem', fontSize: '1.5rem' }} />
      </XIcon>
      <Title>{title}</Title>
      <Content />
    </Container>
  );
};

export default Modal;
