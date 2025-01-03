import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type deleteKeywordLettersRequestProps = {
    letterId: number;
    boxType: string;
};

type deleteKeywordLettersResponse = ApiResponseType<string>;

export async function deleteKeywordLetter({
    letterId,
    boxType
}: deleteKeywordLettersRequestProps): Promise<deleteKeywordLettersResponse> {
    const api = defaultApi();

    const response = await api.delete<deleteKeywordLettersResponse>(
        '/letters',
        {
            data: {
                letterId,
                boxType
            }
        }
    );

    return response.data;
}
