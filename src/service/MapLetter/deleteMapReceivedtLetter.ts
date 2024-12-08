import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type deleteMapReceivedLettersRequestProps = {
    letterIds: number[];
};

type deleteMapReceivedLettersResponse = ApiResponseType<number[]>;

export async function deleteMapReceivedLetter({
    letterIds
}: deleteMapReceivedLettersRequestProps): Promise<deleteMapReceivedLettersResponse> {
    const api = defaultApi();

    const response = await api.delete<deleteMapReceivedLettersResponse>(
        '/map/reply',
        {
            data: {
                letterIds
            }
        }
    );

    return response.data;
}
