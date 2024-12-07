import { useQuery } from '@tanstack/react-query';
import { getRecentRely } from '@/service/storage/getRecentRely';

export const useGetRecentRelyLetter = () => {
    return useQuery({
        queryKey: ['recentRelyLetter'],
        queryFn: getRecentRely
    });
};
