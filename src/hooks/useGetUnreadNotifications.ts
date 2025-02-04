import { useQuery } from '@tanstack/react-query';
import { getUnreadNotifications } from '@/service/notification/getUnreadNotifications';

export const useGetUnreadNotifications = () => {
    return useQuery({
        queryKey: ['unreadNotifications'],
        queryFn: getUnreadNotifications
    });
};
