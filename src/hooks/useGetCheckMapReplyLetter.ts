import { useQuery } from '@tanstack/react-query';
import { getCheckMapReplyLetter } from '@/service/MapLetter/getCheckMapReplyLetter';

type UseCheckMapReplyLetterProps = {
    letterId: number;
};

export const useGetCheckMapReplyLetter = ({
    letterId
}: UseCheckMapReplyLetterProps) => {
    return useQuery<boolean, Error>({
        queryKey: ['getCheckMapReplyLetter', letterId],
        queryFn: async () => {
            const response = await getCheckMapReplyLetter({ letterId });
            return response.result;
        },
        enabled: !!letterId
    });
};
