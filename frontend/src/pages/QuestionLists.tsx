import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { getQuestionList } from '../api/mentoringService';
import QuestionListTemplate from '../components/templates/QuestionLists';
import { QuestionContent, questionList, questionType, selectedLang } from '../recoil/atom';

const QuestionLists = () => {
  const setQuestions = useSetRecoilState<QuestionContent[]>(questionList);
  const type = useRecoilValue(questionType);
  const lang = useRecoilValue<number>(selectedLang);
  const { role } = useParams();

  useEffect(() => {
    const getQuestions = async (): Promise<void> => {
      if (role) {
        const questions = await getQuestionList(type, lang, role);
        if (typeof questions !== 'boolean') {
          setQuestions(questions);
        }
      }
    };
    getQuestions();
  }, [role]);

  return <QuestionListTemplate />;
};

export default QuestionLists;
