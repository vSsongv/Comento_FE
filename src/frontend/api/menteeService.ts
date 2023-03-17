/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mentee } from './api';

export const askQuestion = async (questionContents: FormData): Promise<void | boolean> => {
  try {
    const res = await Mentee.askQuestion(questionContents);
    console.log(res);
    return true;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 400) {
      alert(error.response.data.message);
    }
  }
};
