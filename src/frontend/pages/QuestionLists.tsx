import React from 'react';
import { getQuestionList } from '../api/mentorService';
import QuestionList from '../components/organisms/QuestionList';

const QuestionLists = () => {
  const test = async () => {
    const test = await getQuestionList(0, 1);
    console.log(test);
  };
  test();

  return <QuestionList></QuestionList>;
};

export default QuestionLists;
