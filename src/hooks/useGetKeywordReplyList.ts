import { useQuery } from '@tanstack/react-query';
import { getKeywordReplyList } from '@/service/keyword/getKeywordReplyList';
import { ReplyListResponseType } from '@/types/letter';

type KeywordReplyListRequestProps = {
    letterId: number;
    page: number;
    size: number;
    sort: string;
};

export const useGetKeywordReplyList = ({
    letterId,
    page,
    size,
    sort
}: KeywordReplyListRequestProps) => {
    return useQuery<ReplyListResponseType, Error>({
        queryKey: ['getKeywordReplyLists', letterId, page, size, sort],
        queryFn: async () => {
            const response = await getKeywordReplyList({
                letterId,
                page,
                size,
                sort
            });
            return response.result;
        },
        enabled: !!letterId
    });
};
