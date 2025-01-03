import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { GetKeywordLetterDetailResponseType } from '@/types/letter';

type KeywordLetterDetailRequestProps = {
    letterId: string;
};

type KeywordLetterDetailResponse =
    ApiResponseType<GetKeywordLetterDetailResponseType>;

export async function getKeywordLetterDetail({
    letterId
}: KeywordLetterDetailRequestProps): Promise<KeywordLetterDetailResponse> {
    const api = defaultApi();

    const response = await api.get<KeywordLetterDetailResponse>(
        `/letters/detail/${letterId}`
    );
    return response.data;
}
