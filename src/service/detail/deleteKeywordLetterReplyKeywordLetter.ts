import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type deleteKeywordLettersRequestProps = {
    letterId: number;
    letterType: string;
    boxType: string;
};

type deleteKeywordLettersResponse = ApiResponseType<string>;

export async function deleteKeywordLetterReplyKeywordLetter({
    letterId,
    letterType,
    boxType
}: deleteKeywordLettersRequestProps): Promise<deleteKeywordLettersResponse> {
    const api = defaultApi();

    const response = await api.delete<deleteKeywordLettersResponse>(
        '/letters',
        {
            data: {
                letterId,
                letterType,
                boxType
            }
        }
    );

    return response.data;
}
