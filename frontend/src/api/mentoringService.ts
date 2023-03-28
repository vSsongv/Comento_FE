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

export const getQuestionTypeNum = async (role: string, language: number): Promise<QuestionType | boolean> => {
  try {
    const res = await Mentoring.getQuestionTypeNum(role, language);
    return res.data.result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const confirmMentoring = async (mentoringId: string): Promise<boolean> => {
  try {
    const res = await Mentoring.confirmMentoring(mentoringId);
    alert(res.data.message);
    return true;
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

export const deleteAnswer = async (mentoringId: string): Promise<boolean> => {
  try {
    const res = await Mentoring.deleteAnswer(mentoringId);
    alert(res.data.message);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
