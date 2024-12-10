import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type deleteMapArchivedLettersRequestProps = {
    archiveIds: number[];
};

type deleteMapArchivedLettersResponse = ApiResponseType<number[]>;

export async function deleteMapArchivedLetter({
    archiveIds
}: deleteMapArchivedLettersRequestProps): Promise<deleteMapArchivedLettersResponse> {
    const api = defaultApi();

    const response = await api.delete<deleteMapArchivedLettersResponse>(
        '/map/archived',
        {
            data: {
                archiveIds
            }
        }
    );

    return response.data;
}
