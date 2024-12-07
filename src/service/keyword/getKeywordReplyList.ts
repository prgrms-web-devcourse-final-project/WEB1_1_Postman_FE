import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { KeywordReplyListResponseType } from '@/types/letter';

type KeywordReplyListRequestProps = {
    letterId: number;
    page: number;
    size: number;
    sort: string;
};

type KeywordReplyListResponse = ApiResponseType<KeywordReplyListResponseType>;

export async function getKeywordReplyList({
    letterId,
    page,
    size,
    sort
}: KeywordReplyListRequestProps): Promise<KeywordReplyListResponse> {
    const api = defaultApi();
    const response = await api.get<KeywordReplyListResponse>(
        `/letters/replies/${letterId}`,
        {
            params: { page, size, sort }
        }
    );
    return response.data;
}
