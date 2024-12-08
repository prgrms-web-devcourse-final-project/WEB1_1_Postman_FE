import { defaultApi } from '@/service/api';
import { NotificationResponseType } from '@/types/notification';

export const updateNotificationStatus = async (
    isRead: boolean
): Promise<NotificationResponseType> => {
    const api = defaultApi();

    const response = await api.patch('/notification', { isRead });
    return response.data;
};
