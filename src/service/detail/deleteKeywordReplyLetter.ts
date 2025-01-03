import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type deleteKeywordReplyLettersRequestProps = {
    letterId: number;
    boxType: string;
};

type deleteKeywordReplyLettersResponse = ApiResponseType<string>;

export async function deleteKeywordReplyLetter({
    letterId,
    boxType
}: deleteKeywordReplyLettersRequestProps): Promise<deleteKeywordReplyLettersResponse> {
    const api = defaultApi();

    const response = await api.delete<deleteKeywordReplyLettersResponse>(
        '/letters/replies',
        {
            data: {
                letterId,
                boxType
            }
        }
    );

    return response.data;
}
