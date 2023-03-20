import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { getAnswerList } from '../api/mentorService';
import ListTemplate from '../components/templates/ListTemplate';
import { QuestionContent, questionList, questionType } from '../recoil/atom';

const QuestionLists = () => {
  const setQuestions = useSetRecoilState<QuestionContent[]>(questionList);
  const type = useRecoilValue(questionType);
  const { role } = useParams();

  useEffect(() => {
    const getQuestions = async (): Promise<void> => {
      const questions = role === 'mento' ? await getAnswerList(type, 1) : await getAnswerList(type, 3);
      if (typeof questions !== 'boolean') {
        setQuestions(questions);
      }
    };
    getQuestions();
  });

  return <ListTemplate />;
};

export default QuestionLists;
