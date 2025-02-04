import { defaultApi } from '@/service/api';
import { unreadNotificationsType } from '@/types/unreadNotification';

export const getUnreadNotifications =
    async (): Promise<unreadNotificationsType> => {
        const api = defaultApi();

        const response = await api.get('/notification/unread');
        return response.data;
    };
