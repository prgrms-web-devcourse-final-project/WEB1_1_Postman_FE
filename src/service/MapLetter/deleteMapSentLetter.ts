import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type deleteMapSentLettersRequestProps = {
    letterIds: number[];
};

type deleteMapSentLettersResponse = ApiResponseType<number[]>;

export async function deleteMapSentLetter({
    letterIds
}: deleteMapSentLettersRequestProps): Promise<deleteMapSentLettersResponse> {
    const api = defaultApi();

    const response = await api.delete<deleteMapSentLettersResponse>('/map', {
        data: {
            letterIds
        }
    });

    return response.data;
}
