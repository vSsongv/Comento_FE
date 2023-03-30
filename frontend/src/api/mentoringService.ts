import { QuestionContent } from '../recoil/atom';
import { Mentoring, FeedBack } from './api';
import { FeedbackProps } from '../components/organisms/FeedbackModal';

export interface QuestionType {
  before: number;
  ing: number;
  end: number;
}

export const getQuestionList = async (
  type: number,
  language: number,
  role: string
): Promise<QuestionContent[] | boolean> => {
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

export const SendFeedback = async (feedbackContents: FeedbackProps): Promise<void | boolean> => {
  try {
    const res = await FeedBack.sendFeedback(feedbackContents);
    if (res) {
      alert('피드백이 전송되었습니다.');
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      console.log(error);
    }
    return false;
  }
};
