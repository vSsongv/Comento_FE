import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

const ListContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.6rem 0;
  cursor: pointer;
`;

const MenuName = styled.p`
  width: 85%;
  padding-left: 0.5rem;
`;

const RightArrow = styled(MdKeyboardArrowRight)`
  font-size: large;
`;

interface Props {
  imageSrc: string;
  menu: string;
}

const MenuListAtom = ({ imageSrc, menu }: Props) => {
  const navigate = useNavigate();

  const moveTo = () => {
    if (menu === '질문하기') {
      navigate('/question');
    } else if (menu === '결제하기') {
      navigate('/signIn');
    } else if (menu === '마이페이지') {
      navigate('/signUp');
    } else {
      navigate('/answer');
    }
  };

  return (
    <ListContainer onClick={moveTo}>
      <img src={imageSrc} width='20rem' alt={menu} />
      <MenuName>{menu}</MenuName>
      <RightArrow />
    </ListContainer>
  );
};

export default MenuListAtom;
