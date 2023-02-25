import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { headerMenu } from '../../recoil/atom/headerVisibilityAtom';

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
  const [headerState, setHeaderState] = useRecoilState<boolean>(headerMenu);
  const navigate = useNavigate();

  const moveTo = () => {
    switch (menu) {
      case '질문하기':
        navigate('/question');
        break;
      case '결제하기':
        navigate('/signIn');
        break;
      case '마이페이지':
        navigate('/answer');
        break;
      case '로그아웃': //TODO: 로그아웃 구현
        alert('TODO');
        break;
      default:
        alert('잘못된 접근입니다.');
        break;
    }
    setHeaderState(!headerState);
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
