/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mentee } from './api';

export const askQuestion = async (questionContents: FormData): Promise<void | boolean> => {
  try {
    const res = await Mentee.askQuestion(questionContents);
    if (res) return true;
  } catch (error: any) {
    if (error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const editQuestion = async (questionContents: FormData, questionId: string): Promise<void | boolean> => {
  try {
    const res = await Mentee.editQuestion(questionContents, questionId);
    if (res) return true;
  } catch (error: any) {
    if (error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};
