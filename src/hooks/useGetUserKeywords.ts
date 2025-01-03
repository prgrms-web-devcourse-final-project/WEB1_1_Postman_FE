import { useQuery } from '@tanstack/react-query';
import { getUserKeyword } from '@/service/keyword/getUserKeyword';

export const useGetUserKeywords = () => {
    return useQuery({
        queryKey: ['userKeywords'],
        queryFn: getUserKeyword
    });
};
