import { useQuery } from '@tanstack/react-query';
import { getRecommendedLetter } from '@/service/storage/getRecommendedLetter';

export const useGetRecommendLetter = () => {
    return useQuery({
        queryKey: ['recommendedLetter'],
        queryFn: getRecommendedLetter
    });
};
