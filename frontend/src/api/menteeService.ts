/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mentee } from './api';

export const askQuestion = async (questionContents: FormData): Promise<void | boolean> => {
  try {
    const res = await Mentee.askQuestion(questionContents);
    if (res) return true;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 400) {
      alert(error.response.data.message);
    }
  }
};

export const editQuestion = async (questionContents: FormData, mentoringId: string): Promise<void | boolean> => {
  try {
    const res = await Mentee.editQuestion(questionContents, mentoringId);
    if (res) return true;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 400) {
      alert(error.response.data.message);
    }
  }
};
