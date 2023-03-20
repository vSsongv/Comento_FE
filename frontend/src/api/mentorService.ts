import { QuestionContent } from './../recoil/atom';
import { Mentor } from './api';

export const getAnswerList = async (type: number, language: number): Promise<QuestionContent[] | boolean> => {
  try {
    const res = await Mentor.getAnswerList(type, language);
    return res.data.result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
