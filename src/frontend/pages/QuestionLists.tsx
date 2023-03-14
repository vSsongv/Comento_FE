import React from 'react';
import { getQuestionList } from '../api/mentorService';
import QuestionList from '../components/organisms/QuestionList';

const QuestionLists = () => {
  // getQuestionList(0, 1);

  return <QuestionList></QuestionList>;
};

export default QuestionLists;
