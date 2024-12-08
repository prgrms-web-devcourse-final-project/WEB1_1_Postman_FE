import { useMutation } from '@tanstack/react-query';
import { updateNotificationStatus } from '@/service/notification/updateNotificationStatus';

export const useUpdateNotificationStatus = () => {
    return useMutation({
        mutationFn: updateNotificationStatus
    });
};
