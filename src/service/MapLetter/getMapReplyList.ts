import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { ReplyListResponseType } from '@/types/letter';

type MapReplyListRequestProps = {
    letterId: number;
    page?: number;
    size?: number;
};

type MapReplyListResponse = ApiResponseType<ReplyListResponseType>;

export async function getMapReplyList({
    letterId,
    page,
    size
}: MapReplyListRequestProps): Promise<MapReplyListResponse> {
    const api = defaultApi();
    const response = await api.get<MapReplyListResponse>(
        `/map/${letterId}/reply`,
        {
            params: { page, size }
        }
    );
    return response.data;
}
