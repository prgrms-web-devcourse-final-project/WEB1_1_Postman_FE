import { useQuery } from '@tanstack/react-query';
import { getMapReplyList } from '@/service/MapLetter/getMapReplyList';
import { ReplyListResponseType } from '@/types/letter';

type MapReplyListRequestProps = {
    letterId: number;
    page?: number;
    size?: number;
};

export const useGetMapReplyList = ({
    letterId,
    page,
    size
}: MapReplyListRequestProps) => {
    return useQuery<ReplyListResponseType, Error>({
        queryKey: ['getMapReplyList', letterId, page, size],
        queryFn: async () => {
            const response = await getMapReplyList({
                letterId,
                page,
                size
            });
            return response.result;
        },
        enabled: !!letterId
    });
};
