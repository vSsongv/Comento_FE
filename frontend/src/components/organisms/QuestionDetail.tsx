import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { border, boxShadow } from '../../styles/styleUtil';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import { GetSpecificQuestion, QuestionProp } from '../../api/chattingService';
import { useNavigate, useParams } from 'react-router-dom';
import FlashBtn from '../atoms/FlashBtn';
import { useRecoilValue } from 'recoil';
import { crtQuestion } from '../../recoil/atom';

const QuestionDetailContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 45vw;
  height: 100%;
  padding: 30px;
  background-color: white;
  box-shadow: ${boxShadow};
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
  overflow: scroll;
  height: 100%;
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

const QuestionDetail = () => {
  const { roomid } = useParams();
  const mentoringId = useRecoilValue<string>(crtQuestion);
  const [question, setQuestion] = useState<QuestionProp>();
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
      console.log(mentoringId);
      getSpecificQuestion(mentoringId);
    }
  }, [mentoringId]);

  return (
    <QuestionDetailContainer>
      <TitleContainer>
        <Title>{question?.title}</Title>
        <QuestionInfo>
          {question?.nickname}, {question?.language}, {question?.updatedAt}
        </QuestionInfo>
      </TitleContainer>
      <ContentContainer>
        <Contents>{question?.content}</Contents>
        <ImageContainer>
          <Image imageList={question?.content_image} />
        </ImageContainer>
      </ContentContainer>
      {roomid && (
        <ButtonContainer>
          <FlashBtn width={110} height={35} fontSize={12} onClick={() => navigate('/')}>
            목록으로 이동
          </FlashBtn>
          <Button width={110} height={35} fontSize={12} onClick={() => navigate('/')}>
            멘토링 끝내기
          </Button>
        </ButtonContainer>
      )}
    </QuestionDetailContainer>
  );
};

export default QuestionDetail;
