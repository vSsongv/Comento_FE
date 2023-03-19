import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { getQuestionList } from '../api/mentorService';
import ListTemplate from '../components/templates/ListTemplate';
import { QuestionContent, questionList, questionType } from '../recoil/atom';

const QuestionLists = () => {
  // const setQuestions = useSetRecoilState<QuestionContent[]>(questionList);
  const [q, setQuestions] = useRecoilState<QuestionContent[]>(questionList);
  const type = useRecoilValue(questionType);

  useEffect(() => {
    const getQuestions = async (): Promise<void> => {
      const questions = await getQuestionList(type, 1);
      if (typeof questions !== 'boolean') {
        setQuestions(questions);
      }
    };
    getQuestions();
  }, []);
  console.log(q);

  return <ListTemplate />;
};

export default QuestionLists;
