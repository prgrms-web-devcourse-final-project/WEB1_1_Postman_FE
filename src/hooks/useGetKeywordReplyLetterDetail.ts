import { useQuery } from '@tanstack/react-query';
import { getKeywordReplyLetterDetail } from '@/service/detail/getKeywordReplyLetterDetail';
import { GetKeywordReplyLetterDetailResponseType } from '@/types/letter';

type UseKeywordLetterDetailProps = {
    replyLetterId: string;
};

export const useGetKeywordReplyLetterDetail = ({
    replyLetterId
}: UseKeywordLetterDetailProps) => {
    return useQuery<GetKeywordReplyLetterDetailResponseType, Error>({
        queryKey: ['keywordReplyLetterDetail', replyLetterId],
        queryFn: async () => {
            const response = await getKeywordReplyLetterDetail({
                replyLetterId
            });
            return response.result;
        },
        enabled: !!replyLetterId
    });
};
