import { useQuery } from '@tanstack/react-query';
import { getMapReplyLetterDetail } from '@/service/MapLetter/getMapReplyLetterDetail';
import { GetMapReplyLetterDetailResponseType } from '@/types/letter';

type UseMapLetterDetailProps = {
    letterId: string;
};

export const useGetMapReplyLetterDetail = ({
    letterId
}: UseMapLetterDetailProps) => {
    return useQuery<GetMapReplyLetterDetailResponseType, Error>({
        queryKey: ['mapReplyLetterDetail', letterId],
        queryFn: async () => {
            const response = await getMapReplyLetterDetail({
                letterId
            });
            return response.result;
        }
    });
};
