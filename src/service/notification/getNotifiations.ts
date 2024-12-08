import { defaultApi } from '@/service/api';
import { NotificationResponseType } from '@/types/notification';

export const getNotifications = async (): Promise<NotificationResponseType> => {
    const api = defaultApi();

    const response = await api.patch('/notification');
    return response.data;
};
