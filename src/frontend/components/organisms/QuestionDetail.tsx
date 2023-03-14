import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { border, boxShadow } from '../../styles/styleUtil';
import zz from '../../assets/images/MainAdvantage_approval.png';
import tt from '../../assets/images/MainAdvantage_idea.png';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import { GetSpecificQuestion, QuestionProp } from '../../api/chattingService';
import { useParams } from 'react-router-dom';

const QuestionDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 43vw;
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

const QuestionDetail = () => {
  const images = [zz, tt, tt, tt];
  const { roomid } = useParams();
  const [question, setQuestion] = useState<QuestionProp>();

  useEffect(() => {
    if (roomid) {
      const getSpecificQuestion = async () => {
        const questionInfo = await GetSpecificQuestion(roomid);
        if (typeof questionInfo !== 'boolean') {
          setQuestion(questionInfo);
        }
      };
      getSpecificQuestion();
    }
  }, []);

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
        <ImageContainer>{/* <Image imageList={question?.content_image} /> */}</ImageContainer>
      </ContentContainer>
      <Button width={110} height={50} fontSize={12}>
        멘토링 끝내기
      </Button>
    </QuestionDetailContainer>
  );
};

export default QuestionDetail;
