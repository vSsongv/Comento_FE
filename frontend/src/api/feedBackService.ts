import { FeedbackProps } from '../components/organisms/FeedbackModal';
import { FeedBack } from './api';

export const SendFeedback = async (feedbackContents: FeedbackProps): Promise<void | boolean> => {
  try {
    const res = await FeedBack.sendFeedback(feedbackContents);
    if (res) return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 400) {
      alert(error.response.data.message);
    }
    return false;
  }
};
