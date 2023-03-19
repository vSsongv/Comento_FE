import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import useClickState from '../../hooks/useClickState';
import { modalVisibleState } from '../../recoil/atom';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ImageView = styled.img`
  background-color: white;
  width: 32rem;
  height: 32rem;
`;

interface Props {
  imageSrc: string;
}

const ImageViewModal = ({ imageSrc }: Props) => {
  const setModalVisibility = useSetRecoilState<boolean>(modalVisibleState);
  const [modalRef, handleClickOutside] = useClickState(setModalVisibility);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <Background>
      <div ref={modalRef}>
        <ImageView src={imageSrc} alt='이미지 확대' />
      </div>
    </Background>
  );
};

export default ImageViewModal;
