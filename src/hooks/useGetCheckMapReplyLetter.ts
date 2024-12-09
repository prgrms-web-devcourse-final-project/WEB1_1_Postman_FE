import { useQuery } from '@tanstack/react-query';
import { getCheckMapReplyLetter } from '@/service/MapLetter/getCheckMapReplyLetter';

export const useGetCheckMapReplyLetter = ({ letterId }: number) => {
    return useQuery<string, Error, void>({
        queryKey: ['getCheckMapReplyLetter', letterId],
        queryFn: async () => {
            const response = await getCheckMapReplyLetter({ letterId });
            return response.result;
        },
        enabled: !!letterId
    });
};
