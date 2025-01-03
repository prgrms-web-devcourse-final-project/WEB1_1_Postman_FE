import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/service/notification/getNotifiations';

export const useGetNotifications = () => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: getNotifications
    });
};
