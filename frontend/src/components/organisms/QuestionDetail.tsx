import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { border, boxShadow } from '../../styles/styleUtil';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import { GetSpecificQuestion, QuestionProp } from '../../api/chattingService';
import { useNavigate, useParams } from 'react-router-dom';
import FlashBtn from '../atoms/FlashBtn';
import FeedbackModal from './FeedbackModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { crtQuestion, crtRoleAtom, modalVisibleState } from '../../recoil/atom';

interface Props {
  width: number;
}

const QuestionDetailContainer = styled.div<Props>`
  ${(props) => {
    const WIDTH = props.width;
    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      width: ${WIDTH}vw;
      height: 100%;
      padding: 30px;
      background-color: white;
      box-shadow: ${boxShadow};
    `;
  }};
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 60px;
  padding-right: 8px;
  padding-left: 10px;
  ${border(2)}
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 0 10px;
  overflow-y: scroll;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 15px;
`;

const QuestionInfo = styled.p`
  padding: 10px 0;
  font-size: 11px;
  color: #666666;
`;

const Contents = styled.p`
  padding: 17px 0;
  font-size: 16px;
  line-height: 30px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 45px;
  right: 30px;
  width: 230px;
`;

const QuestionDetail = ({ width }: Props) => {
  const { roomid } = useParams();
  const mentoringId = useRecoilValue<string>(crtQuestion);
  const crtRole = useRecoilValue<string>(crtRoleAtom);
  const [question, setQuestion] = useState<QuestionProp>();
  const [modalVisible, setModalVisible] = useRecoilState<boolean>(modalVisibleState);
  const navigate = useNavigate();

  useEffect(() => {
    const getSpecificQuestion = async (id: string) => {
      const questionInfo = await GetSpecificQuestion(id);
      if (typeof questionInfo !== 'boolean') {
        setQuestion(questionInfo);
      }
    };
    if (roomid) {
      getSpecificQuestion(roomid);
    } else {
      getSpecificQuestion(mentoringId);
    }
  }, [mentoringId]);

  const goToList = () => {
    navigate(`/questionList/${crtRole}`);
  };

  return (
    <QuestionDetailContainer width={width}>
      <TitleContainer>
        <Title>{question?.title}</Title>
        <QuestionInfo>
          {question?.nickname}, {question?.language}, {question?.updatedAt}
        </QuestionInfo>
      </TitleContainer>
      <ContentContainer>
        <Contents>
          {question?.content.split('\n').map((line, i) => {
            return (
              <span key={i}>
                {line}
                <br />
              </span>
            );
          })}
        </Contents>
        <ImageContainer>
          <Image imageList={question?.content_image} />
        </ImageContainer>
      </ContentContainer>
      {roomid && (
        <ButtonContainer>
          <FlashBtn width={110} height={35} fontSize={12} onClick={goToList}>
            목록으로 이동
          </FlashBtn>
          <Button
            width={110}
            height={35}
            fontSize={12}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            멘토링 끝내기
          </Button>
          {modalVisible ? <FeedbackModal /> : null}
        </ButtonContainer>
      )}
    </QuestionDetailContainer>
  );
};

export default QuestionDetail;
