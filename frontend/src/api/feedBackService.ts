import { FeedbackProps } from '../components/organisms/FeedbackModal';
import { FeedBack } from './api';

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
