import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { signInState, headerMenu } from '../../recoil/atom';
import { useCookies } from 'react-cookie';

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

const HeaderNav = ({ imageSrc, menu }: Props) => {
  const [headerState, setHeaderState] = useRecoilState<boolean>(headerMenu);
  const [, , removeCookie] = useCookies(['refresh-token']);
  const setSignInState = useSetRecoilState(signInState);
  const navigate = useNavigate();

  const moveTo = () => {
    switch (menu) {
      case '결제하기':
        navigate('/signIn');
        break;
      case '내 질문 목록':
        navigate('/questionList');
        break;
      case '로그아웃':
        sessionStorage.removeItem('token_exp');
        setSignInState(false);
        removeCookie('refresh-token');
        navigate('/');
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

export default HeaderNav;
