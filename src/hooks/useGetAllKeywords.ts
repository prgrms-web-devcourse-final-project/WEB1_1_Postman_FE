import { useQuery } from '@tanstack/react-query';
import { getAllKeyword } from '@/service/keyword/getAllKeyword';

export const useGetAllKeywords = () => {
    return useQuery({
        queryKey: ['allKeywords'],
        queryFn: getAllKeyword
    });
};
