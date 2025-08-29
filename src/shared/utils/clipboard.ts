import { MESSAGES } from '@/shared/constants';
import { message } from 'antd';

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    message.success(MESSAGES.COPY_SUCCESS);
  } catch (error) {
    message.error(MESSAGES.COPY_ERROR);
  }
};
