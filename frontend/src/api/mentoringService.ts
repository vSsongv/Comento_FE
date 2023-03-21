import { QuestionContent } from '../recoil/atom';
import { Mentoring } from './api';

export const getQuestionList = async (type: number, language: number, role: string): Promise<QuestionContent[] | boolean> => {
  try {
    const res = await Mentoring.getQuestionList(type, language, role);
    return res.data.result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
