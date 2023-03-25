import { QuestionContent } from '../recoil/atom';
import { Mentoring } from './api';

export interface QuestionType {
  before: number;
  ing: number;
  end: number;
}

export const getQuestionList = async (type: number, language: number, role: string): Promise<QuestionContent[] | boolean> => {
  try {
    const res = await Mentoring.getQuestionList(type, language, role);
    return res.data.result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getQuestionTypeNum = async (): Promise<QuestionType | boolean> => {
  try {
    const res = await Mentoring.getQuestionTypeNum();
    return res.data.result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteQuestion = async (mentoringId: string): Promise<boolean> => {
  try {
    const res = await Mentoring.deleteQuestion(mentoringId);
    alert(res.data.message);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
