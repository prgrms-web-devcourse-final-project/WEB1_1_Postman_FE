import { useSuspenseQuery } from '@tanstack/react-query';
import { getKeywordLetterDetail } from '@/service/detail/getKeywordLetterDetail';
import { GetKeywordLetterDetailResponseType } from '@/types/letter';

type UseKeywordLetterDetailProps = {
    letterId: string;
};

export const useKeywordLetterDetail = ({
    letterId
}: UseKeywordLetterDetailProps) => {
    return useSuspenseQuery<GetKeywordLetterDetailResponseType, Error>({
        queryKey: ['keywordLetterDetail', letterId],
        queryFn: async () => {
            const response = await getKeywordLetterDetail({ letterId });
            return response.result;
        }
    });
};
