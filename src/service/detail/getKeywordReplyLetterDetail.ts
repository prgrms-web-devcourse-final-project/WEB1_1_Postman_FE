import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { GetKeywordReplyLetterDetailResponseType } from '@/types/letter';

type KeywordReplyLetterDetailRequestProps = {
    replyLetterId: number;
};

type KeywordReplyLetterDetailResponse =
    ApiResponseType<GetKeywordReplyLetterDetailResponseType>;

export async function getKeywordReplyLetterDetail({
    replyLetterId
}: KeywordReplyLetterDetailRequestProps): Promise<KeywordReplyLetterDetailResponse> {
    const api = defaultApi();

    const response = await api.get<KeywordReplyLetterDetailResponse>(
        `/letters/replies/detail/${replyLetterId}`
    );
    return response.data;
}
