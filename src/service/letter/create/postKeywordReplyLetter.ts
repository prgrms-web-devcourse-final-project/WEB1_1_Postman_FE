import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { CreateKeywordReplyLetterResponseType } from '@/types/letter';

type PostKeywordReplyLetterRequestProps = {
    letterId: number;
};

type PostKeywordReplyLetterResponse =
    ApiResponseType<CreateKeywordReplyLetterResponseType>;

export async function postKeywordReplyLetter({
    letterId
}: PostKeywordReplyLetterRequestProps): Promise<PostKeywordReplyLetterResponse> {
    const api = defaultApi();
    const response = await api.post<PostKeywordReplyLetterResponse>(
        `/letters/replies/${letterId}`
    );
    return response.data;
}
