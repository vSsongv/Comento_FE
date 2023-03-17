import { Mentor } from './api';

export const getQuestionList = async (type: number, language: number): Promise<void> => {
  try {
    const res = await Mentor.getQuestionList(type, language);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};
